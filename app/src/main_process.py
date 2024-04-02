import os

from .clip import Clip
from .video_process import process_video

def main(dic_path):
    # 파일 경로 구하기
    file_list = os.listdir(dic_path)
    video_path = dic_path + "/" + file_list[0]
    # print(video_path)
    
    # 영상 텍스트 추출
    result = process_video(video_path)
    # 텍스트 결과 바탕으로 클립 생성
    c = Clip(result[0], result[1])
    c.set_path(video_path)
    c.split()
    c.join()
    
    # 원본영상 삭제
    if os.path.isfile(video_path):
        os.remove(video_path)