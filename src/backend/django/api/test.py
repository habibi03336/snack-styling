import random

import jwt
from rest_framework import status
from rest_framework.test import APITestCase

from coffProject.test_settings import common_settings
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile


@common_settings
class ClothTests(APITestCase):
    fixtures = ['./data.json']
    userId = 6

    def setUp(self):
        # Set AUTHORIZATION
        key = 'django-test'
        payload = {"Email": "a@aa.com", "exp": 12,
                   "iat": 16, "Key": self.userId}
        encode = jwt.encode(payload, key, algorithm='HS256')
        self.client.credentials(HTTP_AUTHORIZATION=encode)

    def do_cloth_create_by_user(self):
        self.image = str(settings.MEDIA_ROOT) + '/test.png'
        image = SimpleUploadedFile(name='test_image.jpg', content=open(
            self.image, 'rb').read(), content_type='image/jpeg')
        res = self.client.post(
            '/api/v1/cloth/user/',
            data={"image": image},
            format="multipart",
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        return res.data

    def do_cloth_get_list_by_user(self):
        res = self.client.get(
            '/api/v1/cloth/user/',
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        return res.data

    def do_cloth_get(self, id):
        res = self.client.get(
            f'/api/v1/cloth/{str(id)}/',
            format='json',
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        return res.data

    def do_cloth_update(self, id, data):
        res = self.client.patch(
            f'/api/v1/cloth/{id}/',
            data=data,
            format='json',
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        return res.data

    def do_cloth_delete(self, id):
        res = self.client.delete(
            f'/api/v1/cloth/{id}/',
            format='json',
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def do_cloth_multi_update(self, data: list):
        res = self.client.patch(
            '/api/v1/cloth/multi-update/',
            data={
                "clothes": data
            },
            format='json',
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        return res.data

    def test_???_?????????_????????????(self):
        """
        ????????????: ??? ????????? ????????????
        1. ???????????? ??? 3?????? ??????
        2. ???????????? ??? ?????? ?????? ??????
        2. ???????????? ?????? ??????
        """
        # ??? ??????
        cloth_ids = list()
        for _ in range(3):
            cloth = self.do_cloth_create_by_user()
            cloth_ids.append(cloth['id'])

        # ??? ?????? ?????? ??????
        data = list()
        for id in cloth_ids:
            rand_tag = list()
            rand_tag += random.sample([1, 2, 3, 4], random.randint(1, 4))
            rand_tag += [random.randint(5, 8)]

            temp = {'id': id, 'tags': sorted(rand_tag)}
            data.append(temp)

        self.do_cloth_multi_update(data)

        # ??????
        res = self.do_cloth_get_list_by_user()

        self.assertEqual(len(res), 3)

    def test_???_?????????_????????????_???_????????????(self):
        """
        ????????????: ??? ????????? ???????????? ??? ????????? ??????
        1. ??? ??????
        2. ??? ????????? ????????????
        3. ??? ?????? ????????? ??????.
        """
        res = self.do_cloth_create_by_user()
        id = res.get('id')

        data = [{'id': id, 'tags': [3, 4, 6]}]
        self.do_cloth_multi_update(data)

        res = self.do_cloth_get(id)
        self.assertEqual(res['id'], id)
        self.assertEqual(res['category'], "??????")
        self.assertListEqual(res['tags'], ['??????', '??????', '??????'])

        data = {"tags": [1, 5]}
        self.do_cloth_update(id, data)

        res = self.do_cloth_get(id)
        self.assertEqual(res['id'], id)
        self.assertListEqual(res['tags'], ['???', '??????'])

    def test_???_?????????_????????????(self):
        """
        ????????????:
        1. ??? 3??? ??????
        2. ??? 3??? ?????? ??? ?????? ?????? ??????
        3. ?????? ??????
        4. ?????? ??????
        """
        ids = list()
        categories = [5, 6, 7]
        data = list()
        for n in range(3):
            res = self.do_cloth_create_by_user()
            id = res.get('id')
            tag = sorted(random.sample([1, 2, 3, 4], 2) + [categories[n]])

            ids.append(id)
            data.append({'id': id, 'tags': tag})

        self.do_cloth_multi_update(data)
        
        res = self.client.post(
            '/api/v1/codi/user/',
            data={"top": ids[0], "bottom": ids[1], "cap": ids[2]},
            format="json",
        )
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        res = self.client.get(
            '/api/v1/codi/user/'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data['codiList']), 1)
        self.assertEqual(res.data['codiList'][-1]['footwear'], None)
