from collections import OrderedDict
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class CodiListPagination(PageNumberPagination):
    page_size = 10

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('codiList', data),
            ('pageCnt', self.page.paginator.num_pages),
            ('curPage', self.page.number),
        ]))

    def get_paginated_response_schema(self, schema):
        return {
            'type': 'object',
            'properties': {
                'codiList': schema,
                'pageCnt': {
                    'type': 'integer',
                    'example': 12,
                },
                'curPage': {
                    'type': 'integer',
                    'example': 1,
                }
            }
        }
