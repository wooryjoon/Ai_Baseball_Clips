# curs : 커서 객체
def select_all_hitter(cur):
    sql = '''
    SELECT h.name, h.position, t.name
    FROM hitter h LEFT OUTER JOIN team t
    on h.team_id = t.team_id
    '''
    cur.execute(sql) # 커서를 통한 SQL실행
    result = cur.fetchall() # 커서를 통한 SQL실행
    return result 

def select_all_pitcher(cur):
    sql = '''
    SELECT p.name, p.position, t.name
    FROM pitcher p LEFT OUTER JOIN team t
    on p.team_id = t.team_id
    '''
    cur.execute(sql)
    result = cur.fetchall()
    return result