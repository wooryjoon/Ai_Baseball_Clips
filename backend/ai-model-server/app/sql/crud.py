import pymysql

# cursor : 커서 객체
class Cursor:
    def __init__(self, conn): # 데이터베이스를 control 할 수 있는 cursor 객체 연결
        self.curs = conn.cursor(pymysql.cursors.DictCursor) # 딕셔너리 형태로 반환하는 cursor
        
    def close(self): # cursor 연결 종료
        self.curs.close()
        
    def insert(self):
        sql = '''
        '''
        self.curs.execute(sql)
        result = self.curs.fetchall()
        return result

    def select_hitters(self):
        sql = '''
        SELECT h.hitter_id as id, h.name, h.position, t.name as team_name
        FROM hitter h LEFT OUTER JOIN team t
        on h.team_id = t.team_id
        '''
        self.curs.execute(sql) # 커서를 통한 SQL실행
        result = self.curs.fetchall() # SQL실행 결과 반환
        return result 

    def select_pitchers(self):
        sql = '''
        SELECT p.pitcher_id as id, p.name, p.position, t.name as team_name
        FROM pitcher p LEFT OUTER JOIN team t
        on p.team_id = t.team_id
        '''
        self.curs.execute(sql)
        result = self.curs.fetchall()
        return result