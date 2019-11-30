import io, os

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status

from google.cloud import vision, storage

from imageRecoginzationApp.models import history

class uploadFile(APIView):
    permission_classes = (AllowAny,)
    parser_classes = MultiPartParser,
    
    def post(self, request):
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "/home/aayushi/Downloads/Ymir-fe182a10405c.json"
        
        file_data = request.FILES.get('document')
        storage_client = storage.Client()
        
        bucket = storage_client.get_bucket('ymir_images')
        blob = bucket.blob(file_data.name)

        blob.upload_from_string(
            file_data.read(),
            file_data.content_type
        )

        url = blob.public_url

        client = vision.ImageAnnotatorClient()
        image = vision.types.Image()
        image.source.image_uri = url
        response = client.document_text_detection(image=image)

        record=history(url=url,data=response.full_text_annotation.text)
        record.save()


        data= {
            'url': url,
            'text':  response.full_text_annotation.text
        }

        return Response(data, status = status.HTTP_200_OK)


class getHistory(APIView):
    def get(self,request):
        #Getting history from db.
        previous_searches=history.objects.all()
        return Response(previous_searches, status = status.HTTP_200_OK)