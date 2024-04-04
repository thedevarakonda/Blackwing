from fastapi import FastAPI, HTTPException, Response
from pymongo import MongoClient
from datetime import datetime
import json
import base64
from bson import json_util, ObjectId
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


class Idcls(BaseModel):
    id : str

class Datecls(BaseModel):
    date : str

CONNECTION_STRING = "mongodb+srv://m_nikhil_n:Nikhil@miniproject-2.chfsax2.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)
db = client['MajorProject']
collection = db['Live']

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/fetch_data')
async def fetch_data():
    data = collection.find()

    date_counts = {}

    for entry in data:
        print(entry['count'], entry['time'])
        time = entry['time']
        date = datetime(time.year, time.month, time.day)  
        count = entry['count']
        if date in date_counts:
            date_counts[date] += count
        else:
            date_counts[date] = count
    result = [{'date': date.strftime('%Y-%m-%d'), 'count': count} for date, count in date_counts.items()]

    return result


@app.get('/fetch_map')
async def get_maps():
    data = collection.find()
    maps = []
    for entry in data:
        if 'latitude' in entry:
            time = entry['time']
            date = datetime(time.year, time.month, time.day).strftime('%Y-%m-%d')
            # print(entry['longitude  '])
            maps.append({'date':date,'latitude':entry['latitude'],'longitude':entry['longitude']})

    return maps



@app.post('/fetch_image')
async def fetch_image(data : Datecls):
    
    date_object = datetime.strptime(data.date, '%Y-%m-%d').date()
    print(date_object.year)
       
    
    data = collection.find()
    return_array =[]
    for i in data:
        temp = {}
        time = i['time']
        if(time.year == date_object.year and time.month == date_object.month and time.day == date_object.day):
            temp['id']=json.loads(json_util.dumps(i['_id']))["$oid"]
            temp['Time'] = i['time'].strftime('%H:%M:%S')
            temp['Count'] = i['count']
            if('latitude' in i and 'longitude' in i):
                temp['latitude'] = i['latitude']
                temp['longitude'] = i['longitude']

            # temp['Image'] = image_base64 = base64.b64encode(i['image']).decode('utf-8')
            return_array.append(temp)
    
    return return_array

@app.post('/fetch_imageonly')
async def fetch_imageonly(body: Idcls):
    try:
        data = collection.find_one({"_id": ObjectId(body.id)})
        if data is None:
            raise HTTPException(status_code=404, detail="Item not found")
        image_base64 = base64.b64encode(data['image']).decode('utf-8')
        return {'image': image_base64}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/')
async def data():
    return "BlackWingBackend"
