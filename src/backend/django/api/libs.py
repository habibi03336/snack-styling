import jwt


def decode_jwt_payload(token):
    decoded = jwt.decode(token, options={"verify_signature": False})
    # print(decoded['Key'])
    return decoded['Key']


def getUserIdFromJWT(request):
    return decode_jwt_payload(request.META.get('HTTP_AUTHORIZATION'))


def is_selfrequest(request):
    if 'id' in request.query_params:
        return request.query_params['id']

    return decode_jwt_payload(request.META.get('HTTP_AUTHORIZATION'))


def mutable_check(request):
    try:
        setattr(request.data, '_mutable', True)
        request.data['userId'] = is_selfrequest(request)
        setattr(request.data, '_mutable', False)
    except AttributeError:
        request.data['userId'] = is_selfrequest(request)
