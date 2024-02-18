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
        self.splited = [] # 클립들 [시작 시간, 종료 시간] 리스트
        self.cnt = 0 # 클립 개수
        self.cur_pit = None # 시간별 현재 투수
    
    # 원본 비디오 경로 + 만들 클립 저장할 경로 설정
    def set_path(self, video_path):
        self.ori_path = video_path
        self.clip_path = os.path.dirname(video_path)
    
    # 타석 구분하기
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
            # 타자가 바뀌면 타석 종료로 인식하고 클립 생성
            if pre_obj != cur_obj and pre_obj != None:
                clip_ed = pre_sec
                if abs(clip_st - clip_ed) > 2 or clip_st < clip_ed:
                    self.splited.append([pre_obj, clip_st, clip_ed])
                # self.make(pre_obj, clip_st, clip_ed)
                clip_st = cur_sec
        # 마지막 타석
        s = clip_st + 1 
        e = len(self.hit_records) - 1
        while s != e :
            if len(self.hit_records[e]) == 1:
                self.splited.append([list(self.hit_records[clip_st])[0], clip_st, e])
                # self.make(list(self.hit_records[clip_st])[0], clip_st, e)
                break
            e -= 1

    # 같은 타석인데 분할된 경우 다시 합치기
    def join(self):
        i = 0
        pre_obj = None
        cur_obj, clip_st, clip_ed = self.splited[i][0], self.splited[i][1], self.splited[i][2]
        i += 1
        while i < len(self.splited):
            pre_obj = cur_obj
            cur_obj = self.splited[i][0]
            while pre_obj == cur_obj:
                clip_ed = self.splited[i][2]
                i += 1
                # 마지막 클립 시간이 앞의 클립과 합쳐졌을 경우
                if i == len(self.splited):
                    self.make(pre_obj, clip_st, clip_ed)
                    return
                pre_obj = cur_obj
                cur_obj = self.splited[i][0]
            self.make(pre_obj, clip_st, clip_ed)
            if i == len(self.splited):
                break
            clip_st, clip_ed = self.splited[i][1], self.splited[i][2]
            i += 1
        # 마지막 타석만 남았을 경우
        self.make(cur_obj, clip_st, clip_ed)


    # 클립 만들기       
    def make(self, hit_obj, clip_st, clip_ed):
        print(hit_obj.name, clip_st, clip_ed)
        if abs(clip_st - clip_ed) <= 2 or clip_st > clip_ed:
            return
        self.cnt += 1
        if clip_st > 2:
            clip_st -= 2
        clip_ed += 2
        if clip_ed > len(self.hit_records) - 1:
            clip_ed = len(self.hit_records) - 1
        # 투수 찾기
        pit = self.pit_records[clip_st]
        if len(pit) == 0: # 타석 종료 이전에 나온 투수 탐색
            s = clip_st
            while len(self.pit_records[s]) != 1:
                s += 1
            pit = self.pit_records[s]
            
        pit_id = list(pit)[0].id
        # 혹시 같은 팀 타자랑 매칭될 경우
        if self.cur_pit is not None and list(pit)[0].team_name == hit_obj.team_name:
            pit_id = self.cur_pit.id
        hit_id = hit_obj.id
        title = "/{}__{}__{}__{}.mp4".format(pit_id, hit_id, 0, self.cnt)
        print("making clip : {} to {}".format(clip_st, clip_ed))
        clip = VideoFileClip(self.ori_path).subclip(clip_st, clip_ed)
        clip.write_videofile(self.clip_path + title)
        self.cur_pit = list(pit)[0]
        return