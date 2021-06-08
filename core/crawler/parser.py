from crawler import tools
import uuid

class ListCrawler:
    def __init__(self):
        pass

    def resolveHtml(self, html):
        soup = tools.parseHttp(html)
        lists = soup.select('.list4-box')
        items = [self.resolveItem(item) for item in lists]
        return items

    def resolveItem(self, data):
        res = {}
        res['href'] = data.select('.box-img')[0].a['href']
        res['img'] = data.select('.box-img')[0].a.img['src']
        res['title'] = data.select('.box-info .title')[0].a.h2.text
        res['author'] = data.select('.box-add .box-add-name')[0].text
        res['id'] = str(uuid.uuid1())
        # print(res)
        return res

    def start(self, page):
        rawRes = tools.getHtml(tools.BASE_URL + str(page))
        return self.resolveHtml(rawRes)


class DetailCrawler:
    def __init__(self):
        pass

    def getDes(self, content):
        desStr = content.select('.pic-box')[0].text
        firstIndex = desStr.find('\n')
        secondIndex = desStr.find('\n', firstIndex + 1)
        return "".join(desStr[firstIndex: secondIndex].split())

    def getImgs(self, content):
        array = content.select('.pic-box p')
        res = []
        for item in array:
            if item.img and item.img['src']:
                res.append(item.img['src'])
        return res

    def resolveHtml(self, html, id):
        soup = tools.parseHttp(html)
        content = soup.select('.sub-left-content')[0]
        res = {}
        res['title'] = content.select('.title')[0].h1.text
        res['des'] = self.getDes(content)
        res['imgs'] = self.getImgs(content)
        if not res['title'] or len(res['imgs']) == 0:
            return None
        res['id'] = id
        return res

    def start(self, id, url):
        rawRes = tools.getHtml(tools.BASE_URL_DETAIL + url)
        return self.resolveHtml(rawRes, id)