import time
from io import BytesIO
from typing import Optional, Union

import cv2
import numpy as np
from PIL import Image, ImageOps
from PIL.Image import Image as PILImage
from rembg.bg import (alpha_matting_cutout, get_concat_v_multi, naive_cutout,
                      post_process)
from rembg.session_base import BaseSession
from rembg.session_factory import new_session

from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile


def remove(
    data: PILImage,
    alpha_matting: bool = False,
    alpha_matting_foreground_threshold: int = 240,
    alpha_matting_background_threshold: int = 10,
    alpha_matting_erode_size: int = 10,
    session: Optional[BaseSession] = None,
    only_mask: bool = False,
    post_process_mask: bool = False,
) -> PILImage:
    img = data

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

        cutouts.append(cutout)

        # find contours, custom function
        open_cv_image = np.array(mask)
        contours, hierarchy = cv2.findContours(
            open_cv_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for contour in contours:
            # get bounding box = (x,y,w,h)
            temp = cv2.boundingRect(contour)
            if mask_bound[2] * mask_bound[3] < temp[2] * temp[3]:
                mask_bound = temp

    cutout = img

    if len(cutouts) > 0:
        cutout = get_concat_v_multi(cutouts)

    x, y, w, h = mask_bound
    cutout = cutout.crop((x, y, x+w, y+h))

    return cutout


def shapingToSquare(img: PILImage) -> PILImage:
    bgcolor = (0, 0, 0, 0)
    width, height = img.size
    if width == height:
        return img
    if width > height:
        result = Image.new(img.mode, (width, width), bgcolor)
        result.paste(img, (0, (width-height)//2))
    else:
        result = Image.new(img.mode, (height, height), bgcolor)
        result.paste(img, ((height-width)//2, 0))
    return result


def removeBackground(raw_img: InMemoryUploadedFile) -> InMemoryUploadedFile:
    if settings.DEBUG == True:
        return raw_img
    
    pil_img = Image.open(raw_img).convert('RGBA')
    pil_img = ImageOps.exif_transpose(pil_img)

    max_value = max(pil_img.width, pil_img.height)
    div_value = max(max_value // 1000, 1)
    pil_img = pil_img.resize((
        int(pil_img.width/div_value),
        int(pil_img.height/div_value),
    ))
    start = time.time()
    pil_img = remove(pil_img)
    end = time.time()
    print(f"Process Time: {end - start}s")

    pil_img = shapingToSquare(pil_img)

    new_img_io = BytesIO()
    pil_img.save(new_img_io, format='PNG')
    result = InMemoryUploadedFile(
        new_img_io, 'ImageField', raw_img.name, 'image/png', new_img_io.getbuffer().nbytes, raw_img.charset
    )
    return result
