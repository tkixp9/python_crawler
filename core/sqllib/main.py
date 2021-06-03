import pymysql

def connect():
    pass
    # mysql_conn = pymysql.connect(host='localhost', port=3306, user='tk', password='Tk123456', db='d2pic')

def close(mysql_conn):
    mysql_conn.close()
