from flask import Flask, jsonify,Response,send_file
import pymongo
from datetime import datetime
from flask import request
import re
import base64
import io
import json
from PIL import Image

app = Flask(__name__)
# CORS(app, resources={r'/*': {'origins': '*'}})

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

@app.route('/fetch_images',methods=['GET'])
def fetch_images():
    date = request.args.get('date')
    print("Date is:", date)

    data = collection.find()

    images = []

    for entry in data:
        if 'latitude' in entry:
            time = entry['time']
            detected_date = datetime(time.year, time.month, time.day).strftime('%Y-%m-%d')

            if(date == detected_date):
                image_bytes = entry['image']
                image_base64 = base64.b64encode(image_bytes).decode('utf-8')
                # print(type(image))
                location = f"Lat: {entry['latitude']}, Long: {entry['longitude']}"

                image_data = {
                    'time': time.time().strftime('%H:%M:%S'),
                    'count': entry['count'],
                    'location' : location,
                    # 'image': image_base64
                }
                images.append(image_data)
                # break

    return jsonify(images)

@app.route('/images', methods=['GET'])
def get_images():
    data = collection.find()
    images = []
    for entry in data:
        image_bytes = entry['image']
        filename = 'image_from_mongodb.jpg'
        with open(filename, 'wb') as f:
            f.write(image_bytes)

@app.route('/fetch_map',methods=['GET'])
def get_maps():
    data = collection.find()
    maps = []
    for entry in data:
        if 'latitude' in entry:
            time = entry['time']
            date = datetime(time.year, time.month, time.day).strftime('%Y-%m-%d')
            # print(entry['longitude  '])
            maps.append({'date':date,'latitude':entry['latitude'],'longitude':entry['longitude']})

    return jsonify(maps)


@app.route('/')
def data():
    return "BlackWingBackend"

if __name__ == '__main__':
    app.run(debug=True)
