import requests
import re
import sqlite3
import time

PATTERN = r"<item><title>(.*?)</title><link>(.*?)</link><pubDate>(.*?)</pubDate></item>"


class JWC:
    def __init__(self, dbname="jwc.sqlite3"):
        self.url = "http://jwc.sjtu.edu.cn/rss/rss_notice.aspx?SubjectID=198015&TemplateID=221027"
        self.dbname = dbname
        self.con = None
        self.cursor = None
        self.connect_to_db()
        self.create_table()

    def create_table(self):
        """创建表"""
        sql = "create table if not exists jwcdb(id integer primary key , title vchar(100) not null , link vchar(100) " \
              "not null , pubDate date not null ) "
        self.cursor.execute(sql)

    def get_html(self):
        """获取网页的源代码"""
        try:
            r = requests.get(self.url)
            r.encoding = r.apparent_encoding
            r.raise_for_status()
        except Exception as e:
            print(e)
            return None
        else:
            return r.text

    def analyse(self):
        """提取网页中的相关信息"""
        html = self.get_html()
        pattern = re.compile(PATTERN)
        for item in re.findall(pattern, html)[::-1]:
            self.insert_into_db(*item)

    @staticmethod
    def convert_timestamp(t):
        time_struct = time.strptime(t, "%Y-%m-%d %H:%M:%S")
        return time.mktime(time_struct)

    def connect_to_db(self):
        """连接到数据库"""
        try:
            con = sqlite3.connect(self.dbname, timeout=3)
        except Exception as e:
            print(e)
        else:
            self.con = con
            self.cursor = con.cursor()

    def insert_into_db(self, title, link, pubDate):
        """把信息插入到数据库中"""
        sql = "INSERT INTO jwcdb(title, link, pubDate) VALUES(?, ?, ?)"
        self.cursor.execute(sql, (title, link, pubDate))
        self.con.commit()

    def read_from_db(self, num=8):
        """从数据库中读取数据"""
        sql = "SELECT title, link, pubDate FROM jwcdb ORDER BY ID DESC LIMIT {}".format(num)
        result = self.cursor.execute(sql)
        self.con.commit()
        return result.fetchmany(num)

    def update(self):
        html = self.get_html()
        pattern = re.compile(PATTERN)
        stored_link = [item[1] for item in self.read_from_db(10)]
        for item in re.findall(pattern, html)[:10]:
            """从数据库中选十个， 重新爬取的页面中选十个，如果页面中出现的不在数据库中，追加到数据库中"""
            if item[1] not in stored_link:
                self.insert_into_db(*item)

    def __del__(self):
        try:
            self.cursor.close()
            self.con.close()
        except:
            pass


if __name__ == '__main__':
    test = JWC()
    # test.analyse()
    # print(test.read_from_db(10))
    test.update()