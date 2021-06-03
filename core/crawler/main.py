from crawler import http
import pymongo

def requestAll():
    count = 0
    page = 0
    while True:
        items = http.start(page)
        count += len(items)
        page += 1
        if page == 10:
            return count


def start():
    # main.connect()
    count = requestAll()
    print(count)