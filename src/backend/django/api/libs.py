import jwt


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


def mutableCheck(request):
    try:
        setattr(request.data, '_mutable', True)
        request.data['userId'] = isSelfRequest(request)
        setattr(request.data, '_mutable', False)
    except AttributeError:
        request.data['userId'] = isSelfRequest(request)
