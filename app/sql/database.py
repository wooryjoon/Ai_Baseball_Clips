import pymysql

# 데이터베이스 연결
class DB:
    def __init__(self, host, user, passwd, database):
        self.host = host
        self.user = user
        self.passwd = passwd
        self.database = database
        
    def connect(self):
        self.conn = pymysql.connect(
            host = self.host,
            user = self.user,
            passwd = self.passwd,
            database = self.database
        )
        return self.conn
    
    def close(self): # 데이터베이스 연결 종료
        self.conn.close()