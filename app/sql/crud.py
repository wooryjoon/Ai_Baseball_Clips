from .database import mydb

cur = mydb.cursor() # 커서 객체생성

def select_all(): #조회 함수생성
    cur = mydb.cursor()                     #커서 객체생성
    sql ='''show tables'''       #조회 SQL # 테이블명 소문자 유의

    cur.execute(sql)                        #커서를 통한 SQL실행
    select_all_result = cur.fetchall()      #커서의 결과를 담는 객체

    return select_all_result

def select_all_hitter():
    sql = '''
    SELECT * h.name, h.position, t.name
    FROM hitter h LEFT OUTER JOIN team t
    on h.team_id = t.team_id
    '''
    cur.execute(sql)
    result = cur.fetchall()
    return result

def select_all_pitcher():
    sql = '''
    SELECT * p.name, p.position, t.name
    FROM pitcher p LEFT OUTER JOIN team t
    on p.team_id = t.team_id
    '''
    cur.execute(sql)
    result = cur.fetchall()
    return result