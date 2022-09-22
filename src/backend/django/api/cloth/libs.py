from PIL import Image
from io import BytesIO
import time
# from rembg import remove

from django.core.files.uploadedfile import InMemoryUploadedFile

#############
from rembg.bg import ReturnType, post_process, alpha_matting_cutout, naive_cutout, get_concat_v_multi

import io
from typing import Optional, Union

import numpy as np
import cv2
from PIL import Image
from PIL.Image import Image as PILImage

from rembg.session_base import BaseSession
from rembg.session_factory import new_session


def remove(
    data: Union[bytes, PILImage, np.ndarray],
    alpha_matting: bool = False,
    alpha_matting_foreground_threshold: int = 240,
    alpha_matting_background_threshold: int = 10,
    alpha_matting_erode_size: int = 10,
    session: Optional[BaseSession] = None,
    only_mask: bool = False,
    post_process_mask: bool = False,
) -> Union[bytes, PILImage, np.ndarray]:

    if isinstance(data, PILImage):
        return_type = ReturnType.PILLOW
        img = data
    elif isinstance(data, bytes):
        return_type = ReturnType.BYTES
        img = Image.open(io.BytesIO(data))
    elif isinstance(data, np.ndarray):
        return_type = ReturnType.NDARRAY
        img = Image.fromarray(data)
    else:
        raise ValueError("Input type {} is not supported.".format(type(data)))

    if session is None:
        session = new_session("u2net")

    masks = session.predict(img)
    cutouts = []

    mask_bound = (0, 0, 0, 0)

    for mask in masks:
        if post_process_mask:
            mask = Image.fromarray(post_process(np.array(mask)))

        if only_mask:
            cutout = mask

        elif alpha_matting:
            try:
                cutout = alpha_matting_cutout(
                    img,
                    mask,
                    alpha_matting_foreground_threshold,
                    alpha_matting_background_threshold,
                    alpha_matting_erode_size,
                )
            except ValueError:
                cutout = naive_cutout(img, mask)

        else:
            cutout = naive_cutout(img, mask)

        ####
        open_cv_image = np.array(mask)
        contours, hierarchy = cv2.findContours(
            open_cv_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        # print(len(contours))
        for contour in contours:
            temp = cv2.boundingRect(contour)
            if mask_bound[2] * mask_bound[3] < temp[2]*temp[3]:
                mask_bound = temp
        ####
        cutouts.append(cutout)

    cutout = img
    print(mask_bound)
    if len(cutouts) > 0:
        cutout = get_concat_v_multi(cutouts)

    x, y, w, h = mask_bound
    cutout = cutout.crop((x, y, x+w, y+h))
    print(type(cutout))

    if ReturnType.PILLOW == return_type:
        return cutout

    if ReturnType.NDARRAY == return_type:
        return np.asarray(cutout)

    bio = io.BytesIO()
    cutout.save(bio, "PNG")
    bio.seek(0)

    return bio.read()
#####


def removeBackground(raw_img: InMemoryUploadedFile) -> InMemoryUploadedFile:
    pil_img = Image.open(raw_img).convert('RGBA')

    max_value = max(pil_img.width, pil_img.height)
    div_value = max(max_value // 1000, 1)
    resize_img = pil_img.resize((
        int(pil_img.width/div_value),
        int(pil_img.height/div_value),
    ))
    start = time.time()
    new_img = remove(resize_img)
    end = time.time()
    print(f"Process Time: {end - start}s")

    new_img_io = BytesIO()
    new_img.save(new_img_io, format='PNG')
    result = InMemoryUploadedFile(
        new_img_io, 'ImageField', raw_img.name, 'image/png', new_img_io.getbuffer().nbytes, raw_img.charset
    )
    return result
