import jwt
import environ


def readEnvValue(value):
    env = environ.Env()
    return env(value)


def decodeJWTPayload(token):
    decoded = jwt.decode(token, options={"verify_signature": False})
    # print(decoded['Key'])
    return decoded['Key']


def getUserIdFromJWT(request):
    return decodeJWTPayload(request.META.get('HTTP_AUTHORIZATION'))


def isSelfRequest(request):
    if 'id' in request.query_params:
        return request.query_params['id']

    return decodeJWTPayload(request.META.get('HTTP_AUTHORIZATION'))
