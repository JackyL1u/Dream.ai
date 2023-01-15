import pymongo
from decouple import config

try:
    client = pymongo.MongoClient(config('DATABASE'))
    database = client['DeltaHacks']
except Exception as err:
    print(err)
    client = None