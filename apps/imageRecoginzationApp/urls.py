from django.conf.urls import url
from .views import uploadFile, getHistory

urlpatterns = [
    url(r'^upload/$', uploadFile.as_view(), name='uploadFile'),#upload url
    url(r'^history/$', getHistory.as_view(), name='history'),#history url
]