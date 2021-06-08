from flask import request
import json
from bson import json_util

from web import app
from web.search import tools


@app.route('/api/list')
def list():
    page = request.args.get('page', 0, type=int)
    size = request.args.get('size', 10, type=int)
    print('page %d' % page)
    list = tools.getListPage(page, size)
    return json_util.dumps({ 'status': 0, 'data': list }, ensure_ascii=False)


@app.route('/api/detail')
def detail():
    # page = request.args.get('page', 0, type=int)
    id = request.args.get('id', '', type=str)
    detail = tools.getDetail(id)
    return json.dumps({ 'status': 0, 'data': detail }, ensure_ascii=False)