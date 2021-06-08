from crawler.parser import ListCrawler, DetailCrawler
from crawler.tools import getTimeString
from mongodb import main
import schedule
import time

MIN_PAGE = 0
MAX_PAGE = 99

def requestAll():
    d2picList, d2picDetail = main.connect()
    count = 0
    page = MIN_PAGE
    listCrawler = ListCrawler()
    detailCrawler = DetailCrawler()
    while True:
        print('start page: %d' % page)
        try:
            items = listCrawler.start(page)
        except:
            continue
        if not items or len(items) == 0:
            return count
        if main.findOne(d2picList, {'href': items[0]['href']}) or main.findOne(d2picList, {'href': items[-1]['href']}):
            return count
        validateItems = []
        for item in items:
            href = item['href']
            if main.findOne(d2picDetail, { 'href': href }):
                continue
            try:
                detail = detailCrawler.start(item['id'], href)
                if not detail:
                    continue
                detail['href'] = href
                detail['ctime'] = getTimeString()
                detaiInsert = main.insertOne(d2picDetail, detail)
                # print('insert detail: %s' % detaiInsert)
                item['ctime'] = detail['ctime']
                validateItems.append(item)
            except:
                continue
        # print(validateItems)
        if len(validateItems) != 0:
            resInsert = main.insertArray(d2picList, validateItems)
            print('insert list len: %d' % len(resInsert.inserted_ids))
            count += len(validateItems)
        print('end page: %d width count: %d' % (page, count))
        page += 1
        if page == MAX_PAGE:
            return count

def start():
    print('start crawler at time: %s' % getTimeString())
    count = requestAll()
    print('end crawler: %d at time: %s' % (count, getTimeString()))

def scheduleJob():
    start()
    schedule.every(10).minutes.do(start)
    # schedule.every().day.at("12:00").do(start)
    while True:
        schedule.run_pending()
        time.sleep(60)