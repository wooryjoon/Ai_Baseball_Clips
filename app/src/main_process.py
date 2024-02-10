import os

from sql.database import connect_to_mysql
from sql.crud import select_all_hitter, select_all_pitcher
from .video_process import process_video
from .clip_process import process_result

conn = connect_to_mysql()
curs = conn.cursor()
pitchers = select_all_pitcher(curs)
hitters = select_all_hitter(curs)
curs.close()
conn.close()

players = {}

def main(dic_path):
    file_list = os.listdir(dic_path)
    video_path = dic_path + "\\" + file_list[0]
    
    result = process_video(video_path)
    process_result(video_path, result)
    
    # 원본영상 삭제
    if os.path.isfile(video_path):
        os.remove(video_path)