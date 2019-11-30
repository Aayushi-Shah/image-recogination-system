from django.conf.urls import url
from .views import uploadFile

urlpatterns = [
    url(r'^upload/$', uploadFile.as_view(), name='uploadFile'),#upload url
    url(r'^history/$', uploadFile.as_view(), name='history'),#history url
]