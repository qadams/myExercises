from rest_framework import serializers
from api.models import Dog, Breed

class DogSerializer(serializers.ModelSerializer):
    # Model to use and fields of the model to serialize
    class Meta:
        model = Dog
        fields = "__all__"

class BreedSerializer(serializers.ModelSerializer):
    # Model to use and fields of the model to serialize
    class Meta:
        model = Breed
        fields = "__all__"
