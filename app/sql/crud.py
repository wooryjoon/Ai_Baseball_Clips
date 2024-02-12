import pymysql

# cursor : 커서 객체
class Cursor:
    def __init__(self, conn): # 데이터베이스를 control 할 수 있는 cursor 객체 연결
        self.curs = conn.cursor(pymysql.cursors.DictCursor) # 딕셔너리 형태로 반환하는 cursor
        
    def close(self): # cursor 연결 종료
        self.curs.close()
        
    # def insert(self, player: Player):
        # if player.position == "투수":
        #     Table = "pitcher"
        # else:
        #     Table = "hitter"    
        # sql = '''
        # INSERT Into {}
        # VALUES
        # (now(), 1, 1, '고영표', '투수')
        # '''.format(Table)
        # self.cur.execute(sql)
        # result = self.cur.fetchall()
        # return result
    
    def insert(self):
        sql = '''
        insert into team (create_date_time, name)
        values 
        (now(),"KT"),
        (now(),"LG");

        insert into hitter (create_date_time,team_id,`name`, position)
        values
        (now(), 1,'배정대', 'CF'),
        (now(), 1,'김상수', 'SS'),
        (now(), 1,'황재균', '3B'),
        (now(), 1,'박병호', '1B'),
        (now(), 1,'장성우', 'C'),
        (now(), 1,'문상철', 'DH'),
        (now(), 1,'알포드', 'LF'),
        (now(), 1,'박경수', '2B'),
        (now(), 1,'정준영', 'RF'),
        (now(), 1,'강현우', 'C'),
        (now(), 1,'김준태', 'C'),
        (now(), 1,'이호연', '1B'),
        (now(), 1,'오윤석', '1B'),
        (now(), 1,'이상호', '2B'),
        (now(), 1,'신본기', '3B'),
        (now(), 1,'김민혁', 'LF'),
        (now(), 1,'송민섭', 'RF'),
        (now(), 1,'조영호', 'RF'),
        (now(), 2,'홍창기', 'RF'),
        (now(), 2,'박해민', 'CF'),
        (now(), 2,'김현수', 'DH'),
        (now(), 2,'오스틴', '1B'),
        (now(), 2,'오지환', 'SS'),
        (now(), 2,'문보경', '3B'),
        (now(), 2,'박동원', 'C'),
        (now(), 2,'문성주', 'LF'),
        (now(), 2,'신민재', '2B'),
        (now(), 2,'김범석', 'C'),
        (now(), 2,'허도환', 'C'),
        (now(), 2,'정주현', '2B'),
        (now(), 2,'김민성', '3B'),
        (now(), 2,'손호영', '3B'),
        (now(), 2,'안익훈', 'CF'),
        (now(), 2,'최승민', 'CF');
        insert into pitcher (create_date_time, team_id, name, position)
        values 
        (now(), 1,'고영표', 'PITCHER'),
        (now(), 1, '김민', 'PITCHER'),
        (now(), 1,'김영현', 'PITCHER'),
        (now(), 1, '김재윤', 'PITCHER'),
        (now(), 1, '박영현', 'PITCHER'),
        (now(), 1, '배제성', 'PITCHER'),
        (now(), 1, '벤자민', 'PITCHER'),
        (now(), 1, '손동현', 'PITCHER'),
        (now(), 1, '엄상백', 'PITCHER'),
        (now(), 1, '이상동', 'PITCHER'),
        (now(), 1, '주권', 'PITCHER'),
        (now(), 1, '쿠에바스', 'PITCHER'),
        (now(), 2, '켈리', 'PITCHER'),
        (now(), 2, '고우석', 'PITCHER'),
        (now(), 2, '김윤식', 'PITCHER'),
        (now(), 2, '김진성', 'PITCHER'),
        (now(), 2, '백승현', 'PITCHER'),
        (now(), 2,'손주영', 'PITCHER'),
        (now(), 2, '유영찬', 'PITCHER'),
        (now(), 2, '이우찬', 'PITCHER'),
        (now(), 2, '이정용', 'PITCHER'),
        (now(), 2, '임찬규', 'PITCHER'),
        (now(), 2, '정우영', 'PITCHER'),
        (now(), 2, '최동환', 'PITCHER'),
        (now(), 2, '최원태', 'PITCHER'),
        (now(), 2, '함덕주', 'PITCHER');
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