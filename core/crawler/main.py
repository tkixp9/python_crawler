from crawler.parser import ListCrawler
from crawler.parser import DetailCrawler
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
        try:
            items = listCrawler.start(page)
        except:
            continue
        if not items or len(items) == 0:
            return count
        if main.findOne(d2picList, {'href': items[0]['href']}) or main.findOne(d2picList, {'href': items[-1]['href']}):
            return count
        for item in items:
            href = item['href']
            if main.findOne(d2picDetail, { 'href': item['href'] }):
                continue
            try:
                detail = detailCrawler.start(href)
                detail['href'] = href
                detaiInsert = main.insertOne(d2picDetail, detail)
                print('insert detail: %s' % detaiInsert)
            except:
                continue
        resInsert = main.insertArray(d2picList, items)
        print('insert list len: %d' % len(resInsert.inserted_ids))
        count += len(items)
        page += 1
        if page == MAX_PAGE:
            return count

def start():
    print('start crawler')
    count = requestAll()
    print('end crawler: %d' % count)

def scheduleJob():
    start()
    schedule.every(10).minutes.do(start)
    # schedule.every().day.at("12:00").do(start)
    while True:
        schedule.run_pending()
        time.sleep(60)