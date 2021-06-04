import pymongo

def connect():
    client = pymongo.MongoClient("localhost", 27017)
    d2pic = client['d2pic']
    return d2pic['list'], d2pic['detail']

def insertArray(collection, items):
    return collection.insert_many(items)

def insertOne(collection, item):
    return collection.insert_one(item)

def updateOne(collection, last, next):
    return collection.update_one(last, next)

def findOne(collection, last):
    return collection.find_one(last)