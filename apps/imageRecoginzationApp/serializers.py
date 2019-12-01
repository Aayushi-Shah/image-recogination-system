from rest_framework import serializers
from .models import history

class HistroySerializer(serializers.ModelSerializer):
    class Meta:
        model = history
        fields = '__all__'