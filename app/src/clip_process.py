from moviepy.editor import VideoFileClip
import os

from sql.models import Hitter, Pitcher
# clip 생성 methods

# 타석별로 나누기
def split_time(time_set1, time_set2):
    boxes = [] # 타석별 시작 시간, 종료 시간
    common_time_set = time_set1 & time_set2 # 투수 타자 교집합 시간
    clip_st, clip_ed = 0, 0
    pre_sec, cur_sec = 0, 0
    for sec in list(common_time_set):
        pre_sec = cur_sec
        cur_sec = sec
        
        # 첫 번째 타석 시작
        if cur_sec == list(common_time_set)[0]:
            clip_st = cur_sec
            continue
        # 마지막 타석 종료
        if cur_sec == list(common_time_set)[-1]:
            clip_ed = cur_sec
            boxes.append([clip_st, clip_ed])
        # 현재 타석 종료
        if cur_sec - pre_sec > 10:
            clip_ed = pre_sec
            boxes.append([clip_st, clip_ed])
            clip_st = cur_sec
    
    return boxes
    
# clip 만들기
def make_clip(video_path, time, title):
    st_time = time[0], ed_time = time[1]
    if st_time == ed_time or st_time > ed_time:
        return
    print("making clip : {} to {}".format(st_time, ed_time))
    clip = VideoFileClip(video_path).subclip(st_time, ed_time)
    output_path = os.path.dirname(video_path)
    clip.write_videofile(output_path + title)

# result 처리
def process_result(video_path, result):
    clips = []
    hashs = list(result.keys())
    length = len(hashs)
    for i in range(length):
        for j in range(length):
            if i >= j:
                continue
            player1 = result[hashs[i]][0]
            player2 = result[hashs[j]][0]
            if isinstance(player1, Pitcher): 
                pitcher = player1.id
                hitter = player2.id
            else:
                pitcher = player2.id
                hitter = player1.id
            
            boxes = split_time(result[hashs[i]][1], result[hashs[j]][1])
            for k in range(len(boxes)):
                title = "/{}_{}_{}".format(
                pitcher, hitter, k + 1)
                clips.append({"title" : title, "time" : boxes[k]})
    
    clips = sorted(clips, key=lambda clip: clip["time"][0]) # 클립 시작 시간 기준 정렬
    print(clips)
    for i in range(len(clips)):
        make_clip(video_path, clips[i]["time"], title + "_{}.mp4".format(i + 1))