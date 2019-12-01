import io, os

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status

from google.cloud import vision, storage

from imageRecoginzationApp.models import history
from imageRecoginzationApp.serializers import HistroySerializer

class uploadFile(APIView):
    permission_classes = (AllowAny,)
    parser_classes = MultiPartParser,
    
    def post(self, request):
        #set google application credentials in environment variable 
        os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.path.join(settings.BASE_DIR, "Ymir-8feb90f29168.json")
        
        #get file from request
        file_data = request.FILES.get('document')
        #create storage instance 
        storage_client = storage.Client()
        #fetch bucket
        bucket = storage_client.get_bucket('ymir_images')
        blob = bucket.blob(file_data.name)

        #upload blob
        blob.upload_from_string(
            file_data.read(),
            file_data.content_type
        )

        #fetch public url
        url = blob.public_url

        #use google vision api to read image 
        client = vision.ImageAnnotatorClient()
        image = vision.types.Image()
        image.source.image_uri = url
        response = client.document_text_detection(image=image)

        #add image into history table if already not exists
        try:
            history_obj = history.objects.get(url = url)
        except:
            record=history(url=url,data=response.full_text_annotation.text)
            record.save()

        #send response
        data= {
            'url': url,
            'text':  response.full_text_annotation.text
        }
        return Response(data, status = status.HTTP_200_OK)


class getHistory(APIView):
    permission_classes = (AllowAny,)
    def get(self,request):
        #fetch all history data
        previous_searches = history.objects.all()
        #serialize data
        previous_searches = HistroySerializer(previous_searches, many=True).data
        return Response(previous_searches, status = status.HTTP_200_OK)