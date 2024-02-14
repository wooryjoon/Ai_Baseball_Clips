from moviepy.editor import VideoFileClip
import os

class Clip:
    def __init__(self, pit_records, hit_records):
        # 투수 세팅
        for i in range(len(pit_records) - 2, 0, -1):
            if len(pit_records[i]) >= 2:
                continue
            if len(pit_records[i]) == 0:
                pit_records[i] = pit_records[i + 1]
                
        self.pit_records = pit_records
        self.hit_records = hit_records
        self.cnt = 0
    
    def set_path(self, video_path):
        self.ori_path = video_path
        self.clip_path = os.path.dirname(video_path)
    
    def split(self):
        clip_st, clip_ed = 0, 0
        pre_obj, cur_obj = None, None
        pre_sec, cur_sec = 0, 0
        for i in range(1, len(self.hit_records)):
            if len(self.hit_records[i]) >= 2 or len(self.hit_records[i]) == 0:
                continue
            pre_obj = cur_obj
            cur_obj = list(self.hit_records[i])[0]
            pre_sec = cur_sec
            cur_sec = i
            if pre_obj != cur_obj and pre_obj != None:
                clip_ed = pre_sec
                self.make(pre_obj, clip_st, clip_ed)
                clip_st = cur_sec
        # 마지막 타석
        s = clip_st + 1 
        e = len(self.hit_records) - 1
        while s != e :
            if len(self.hit_records[e]) == 1:
                self.make(list(self.hit_records[clip_st])[0], clip_st, e)
                break
            e -= 1
                
    def make(self, hit_obj, clip_st, clip_ed):
        print(hit_obj.name, clip_st, clip_ed)
        self.cnt += 1
        if abs(clip_st - clip_ed) <= 1.5 or clip_st > clip_ed:
            return
        # 투수 찾기
        pit = self.pit_records[clip_ed]
        if len(pit) == 0: # 타석 종료 이전에 나온 투수 탐색
            s = clip_ed
            while len(self.pit_records[s]) != 1:
                if s == 0:
                    break
                s -= 1
            pit = self.pit_records[s]
        pit = list(pit)[0].id
        hit = hit_obj.id
        title = "/{}__{}__{}__{}.mp4".format(pit, hit, 0, self.cnt)
        print("making clip : {} to {}".format(clip_st, clip_ed))
        if clip_st > 2:
            clip_st -= 2
        clip = VideoFileClip(self.ori_path).subclip(clip_st, clip_ed + 2)
        clip.write_videofile(self.clip_path + title)