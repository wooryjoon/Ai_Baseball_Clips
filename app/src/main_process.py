import os

from app.sql.database import DB
from app.sql.config import host, user, passwd, database
from app.sql.crud import Cursor
from app.sql.models import Hitter, Pitcher
from .video_process import process_video
from .clip_process import process_result

def main(dic_path):
    # 파일 경로 구하기
    file_list = os.listdir(dic_path)
    video_path = dic_path + "\\" + file_list[0]
    print(video_path)
    
    # 선수 데이터 가져오기
    try:
        myDB = DB(host, user, passwd, database)
        curs = Cursor(myDB.connect())
        # curs.insert()
        players = []
        hitters = curs.select_hitters()
        pitchers = curs.select_pitchers()
        for i in range(len(hitters)):
            players.append(Hitter(**hitters[i])) # hitter 클래스로 변환
        for i in range(len(pitchers)):
            players.append(Pitcher(**pitchers[i])) # pitcher 클래스로 변환
    finally:
        curs.close()
        myDB.close()
    
    result = process_video(video_path, players)
    process_result(video_path, result)
    
    # 원본영상 삭제
    if os.path.isfile(video_path):
        os.remove(video_path)