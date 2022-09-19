import jwt
import environ
from PIL import Image
from io import BytesIO
from rembg import remove

from django.core.files.uploadedfile import InMemoryUploadedFile


def removeBackground(raw_img: InMemoryUploadedFile) -> InMemoryUploadedFile:
    pil_img = Image.open(raw_img).convert('RGBA')

    max_value = max(pil_img.width, pil_img.height)
    div_value = max(max_value // 1000, 1)
    resize_img = pil_img.resize((
        int(pil_img.width/div_value),
        int(pil_img.height/div_value),
    ))
    new_img = remove(resize_img)
    print(new_img)

    new_img_io = BytesIO()
    new_img.save(new_img_io, format='PNG')
    result = InMemoryUploadedFile(
        new_img_io, 'ImageField', raw_img.name, 'image/png', new_img_io.getbuffer().nbytes, raw_img.charset
    )
    return result

def readEnvValue(value):
    env = environ.Env()
    return env(value)

def decodeJWTPayload(token):
    decoded = jwt.decode(token, options={"verify_signature": False})
    # print(decoded['Key'])
    return decoded['Key']


def isSelfRequest(request):
    if 'id' in request.query_params:
        return request.query_params['id']

    return decodeJWTPayload(request.META.get('HTTP_AUTHORIZATION'))
