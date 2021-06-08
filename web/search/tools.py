from web.mongodb import main

def getListPage(page, size):
    d2picList, d2picDetail = main.connect()
    return main.findPageList(d2picList, size, page * size)

def getDetail(id):
    d2picList, d2picDetail = main.connect()
    return main.findOne(d2picDetail, { 'id': id })

