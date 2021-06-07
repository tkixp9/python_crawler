from urllib import request
from bs4 import BeautifulSoup

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
BASE_URL = 'https://www.51tietu.net/tp/' # https://www.ivsky.com/tupian/zhiwuhuahui/
BASE_URL_DETAIL = 'https://www.51tietu.net'

def getHtml(url):
    req = request.Request(url)
    req.add_header('User-Agent', USER_AGENT)
    resHtml = request.urlopen(req).read().decode('utf-8')
    return resHtml

def parseHttp(html):
    soup = BeautifulSoup(html, 'lxml')
    return soup

