from flask import Flask, jsonify
import pymongo
from datetime import datetime



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

@app.route('/')
def data():
    return "BlackWingBackend"

if __name__ == '__main__':
    app.run(debug=True)
