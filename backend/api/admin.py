from django.contrib import admin

#if ENVIRONMENT == 'PROD':
#	from api.models import *
#else:
from api.models import *

# Register your models here.
admin.site.register(Event, EventAdmin)
admin.site.register(ApiKey, ApiKeyAdmin)
admin.site.register(Dog, DogAdmin)
admin.site.register(Breed, BreedAdmin)
