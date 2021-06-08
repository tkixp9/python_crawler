import pymongo

def connect():
    client = pymongo.MongoClient("localhost", 27017) # mongod --dbpath f:/start2021/dbdata
    d2pic = client['d2pic']
    return d2pic['list'], d2pic['detail']

def findPageList(collection, size, skip):
    result = collection.find({}, { '_id': 0 }).limit(size).skip(skip)
    print(result)
    return [x for x in result]

def findOne(collection, query):
    print(query)
    result = collection.find_one(query, { '_id': 0 })
    print(result)
    return result
