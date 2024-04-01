from flask import Flask, jsonify
import pymongo
from datetime import datetime
import json
import base64
from flask import request
from bson import json_util, ObjectId


app = Flask(__name__)

CONNECTION_STRING = "mongodb+srv://m_nikhil_n:Nikhil@miniproject-2.chfsax2.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('MajorProject')
collection = pymongo.collection.Collection(db, 'Live')

@app.route('/fetch_data', methods=['GET'])
def fetch_data():
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

    return jsonify(result)

@app.route('/fetch_image', methods=['POST'])
def fetch_image():
    
    date_object = datetime.strptime(request.json['date'], '%Y-%m-%d').date()
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
            # temp['Image'] = image_base64 = base64.b64encode(i['image']).decode('utf-8')
            return_array.append(temp)
    
    return jsonify(return_array)
            

@app.route('/fetch_imageonly', methods=['POST'])
def fetch_imageonly():       
    data = collection.find({"_id":ObjectId(request.json['id'])})
    image_base64 = None
    for i in data:
        image_base64 = base64.b64encode(i['image']).decode('utf-8')
    return jsonify({'image': image_base64})

@app.route('/')
def data():
    return "BlackWingBackend"

if __name__ == '__main__':
    app.run(debug=True)
