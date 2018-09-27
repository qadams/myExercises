from __future__ import unicode_literals

from django.db import models
from django.core.validators import *

from django.contrib.auth.models import User, Group

from django.contrib import admin
import base64

class Event(models.Model):
    eventtype = models.CharField(max_length=1000, blank=False)
    timestamp = models.DateTimeField()
    userid = models.CharField(max_length=1000, blank=True)
    requestor = models.GenericIPAddressField(blank=False)

    def __str__(self):
        return str(self.eventtype)

class EventAdmin(admin.ModelAdmin):
    list_display = ('eventtype', 'timestamp')

class ApiKey(models.Model):
    owner = models.CharField(max_length=1000, blank=False)
    key = models.CharField(max_length=5000, blank=False)

    def __str__(self):
        return str(self.owner) + str(self.key)

class ApiKeyAdmin(admin.ModelAdmin):
    list_display = ('owner','key')

class Dog(models.Model):
    name = models.TextField(blank=False)
    age = models.IntegerField(blank=False)
    breed = models.ForeignKey('Breed', on_delete=models.CASCADE,)
    gender = models.TextField(blank=False)
    color = models.TextField(blank=False)
    favoritefood = models.TextField(blank=False)
    favoritetoy = models.TextField(blank=False)

class DogAdmin(admin.ModelAdmin):
#    list_display = ('name', 'age', 'breed', 'gender', 'color', 'favoritefood', 'favoritetoy',)
    list_display = ('id',)

class Breed(models.Model):
    name = models.TextField(blank=False)
    sizeChoice = (('T', 'Tiny'), ('S', 'Small'), ('M', 'Medium'), ('L', 'Large'))
    size = models.TextField(blank=False, choices=sizeChoice)
    friendliness = models.IntegerField(blank=False, validators=[MaxValueValidator(5), MinValueValidator(1)])
    trainability = models.IntegerField(blank=False, validators=[MaxValueValidator(5), MinValueValidator(1)])
    sheddingamount = models.IntegerField(blank=False, validators=[MaxValueValidator(5), MinValueValidator(1)])
    exerciseneeds = models.IntegerField(blank=False, validators=[MaxValueValidator(5), MinValueValidator(1)])

class BreedAdmin(admin.ModelAdmin):
#    list_display = ('name', 'size', 'friendliness', 'trainability', 'sheddingamount', 'exerciseneeds',)
    list_display = ('id',)
