from urllib import request
from bs4 import BeautifulSoup

from crawler.config import USER_AGENT, BASE_URL


def startRequest(page):
    req = request.Request(BASE_URL + str(page))
    req.add_header('User-Agent', USER_AGENT)
    resHtml = request.urlopen(req).read().decode('utf-8')
    return resHtml

def resolveHtml(html):
    soup = BeautifulSoup(html, 'lxml')
    lists = soup.select('.list4-box')
    items = [resolveItem(item) for item in lists]
    return items

def resolveItem(data):
    res = {}
    res['url'] = data.select('.box-img')[0].a.img['src']
    res['title'] = data.select('.box-info .title')[0].a.h2.text
    res['author'] = data.select('.box-add .box-add-name')[0].text
    return res

def start(page):
    rawRes = startRequest(page)
    return resolveHtml(rawRes)