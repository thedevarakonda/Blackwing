import pymongo

CONNECTION_STRING = "mongodb+srv://m_nikhil_n:Nikhil@miniproject-2.chfsax2.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('MajorProject')