from resources.data import players2023 # resources/data/players의 선수명단 가져오기
from moviepy.editor import VideoFileClip
import os
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
def make_clip(video_path, st_time, ed_time, title):
    if st_time == ed_time or st_time > ed_time:
        return
    print("making clip : {} to {}".format(st_time, ed_time))
    clip = VideoFileClip(video_path).subclip(st_time, ed_time)
    output_path = os.path.dirname(video_path)
    clip.write_videofile(output_path + title)

# result 처리
def process_result(video_path, result):
    players = list(result.keys())
    length = len(players)
    for i in range(length):
        for j in range(length):
            if i >= j:
                continue
            player1 = players[i]
            player2 = players[j]
            if players2023.players[player1]["pos"] == "투수":
                pitcher = player1
                hitter = player2
            else:
                pitcher = player2
                hitter = player1
            
            boxes = split_time(result[pitcher], result[hitter])
            for k in range(len(boxes)):
                # title = "{team1}_{pitcher}_{team2}_{hitter}{}.mp4".format(
                # players2023.players[pitcher]["team"], pitcher, players2023.players[hitter]["team"], hitter ,k + 1)
                title = "/{}_{}_{}.mp4".format(
                players2023.players[player2]["team"], player2, k + 1)
                make_clip(video_path, boxes[k][0] - 1, boxes[k][1] + 1, title)