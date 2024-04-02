import cv2 # opencv-python 설치
import imutils
from imutils.object_detection import non_max_suppression
import numpy as np

from .text import Text_Store
from .image_process import img_trim
from .ocr import *

times = 15

def process_video(video_path):
    # initialize the original frame dimensions, new frame dimensions,
    # and ratio between the dimensions
    (W, H) = (None, None)

    # resized image width, height
    # should be multiple of 32
    (newW, newH) = (320, 320)
    (rW, rH) = (None, None)

    # define the two output layer names for the EAST detector model that
    # we are interested -- the first is the output probabilities and the
    # second can be used to derive the bounding box coordinates of text
    layerNames = [
        "feature_fusion/Conv_7/Sigmoid",
        "feature_fusion/concat_3"]

    # load the pre-trained EAST text detector
    print("[INFO] loading EAST text detector...")
    net = cv2.dnn.readNet("resources/deeplearning_model/frozen_east_text_detection.pb")
 
    vs = cv2.VideoCapture(video_path) # video_stream
    total = int(vs.get(cv2.CAP_PROP_FRAME_COUNT)) # 동영상의 총 프레임수
    fps = int(vs.get(cv2.CAP_PROP_FPS)) # 원본 영상의 fps
    width = int(vs.get(cv2.CAP_PROP_FRAME_WIDTH)) # 원본 영상의 가로 길이
    height = int(vs.get(cv2.CAP_PROP_FRAME_HEIGHT)) # 원본 영상의 세로 길이
    
    ts = Text_Store(total, fps)
    ts.get_players()
    
    score_board = -1 # 4분할 된 프레임 중 스코어보드가 있는 영역을 찾았는지
    part_cnt = [0, 0, 0, 0]
    
    cnt, sec = 0, 0 # 프레임 수, 동영상 시간
    per = 1 # 로딩 퍼센트
    
    print("start reading video")
    while True:
        frame = vs.read()
        frame = frame[1]
        
        # 비디오스트림이 끝났는지
        if frame is None:
            break
        
        # 프레임 수, 영상재생시간 업데이트
        cnt += 1
        if cnt % fps == 0:
            sec += 1
            # print("{}초".format(sec))
        
        # 배속
        global times
        if cnt % times != 0:
            continue
        # print("{}번째 프레임\n".format(cnt))
        
        # if sec != 0 and sec % 60 == 0:
        #     print("{}초 지났습니다.".format(sec))
        
        # resize the frame, maintaining the aspect ratio
        # 전체영상 4분할하여 확대
        # 좌상
        left_top_frame = img_trim(frame, 0, 0, int(width / 2), int(height / 2)) 
        left_top_frame = imutils.resize(left_top_frame, width=800)
        left_top_orig = left_top_frame.copy()
        # 좌하
        left_bot_frame = img_trim(frame, 0, int(height / 2), int(width / 2), int(height / 2))
        left_bot_frame = imutils.resize(left_bot_frame, width=800)
        left_bot_orig = left_bot_frame.copy()
        # 우상
        right_top_frame = img_trim(frame, int(width / 2), 0, int(width / 2), int(height / 2)) 
        right_top_frame = imutils.resize(right_top_frame, width=800)
        right_top_orig = left_top_frame.copy()
        # 우하
        right_bot_frame = img_trim(frame, int(width / 2), int(height / 2), int(width / 2), int(height / 2))
        right_bot_frame = imutils.resize(right_bot_frame, width=800)
        right_bot_orig = left_bot_frame.copy()
        
        # if our frame dimensions are None, we still need to compute the
        # ratio of old frame dimensions to new frame dimensions
        if W is None or H is None:
            (H, W) = left_top_frame.shape[:2]
            rW = W / float(newW)
            rH = H / float(newH)
            
        # resize the frame, this time ignoring aspect ratio
        left_top_frame = cv2.resize(left_top_frame, (newW, newH))
        left_bot_frame = cv2.resize(left_bot_frame, (newW, newH))
        right_top_frame = cv2.resize(right_top_frame, (newW, newH))
        right_bot_frame = cv2.resize(right_bot_frame, (newW, newH))
        all_frame = [[left_top_frame, left_top_orig], [left_bot_frame, left_bot_orig], 
                     [right_top_frame, right_top_orig], [right_bot_frame, right_bot_orig]]
        
        # 스코어 보드 찾기 전
        if score_board == -1:
            for i in range(len(all_frame)):
                # construct a blob from the frame and then perform a forward pass
                # of the model to obtain the two output layer sets
                blob = cv2.dnn.blobFromImage(all_frame[i][0], 1.0, (newW, newH),
                    (123.68, 116.78, 103.94), swapRB=True, crop=False)
                net.setInput(blob)
                (scores, geometry) = net.forward(layerNames)
                
                # decode the predictions, then apply non-maxima suppression to
                # suppress weak, overlapping bounding boxes
                (rects, confidences) = decode_predictions(scores, geometry)
                
                boxes = non_max_suppression(np.array(rects), probs=confidences)

                # loop over the bounding boxes
                for (startX, startY, endX, endY) in boxes:
                    
                    # scale the bounding box coordinates based on the respective
                    # ratios
                    startX = int(startX * rW)
                    startY = int(startY * rH)
                    endX = int(endX * rW)
                    endY = int(endY * rH)
                    
                    text = read_text(all_frame[i][1][startY:endY, startX:endX])
                    
                    if ts.record(text, sec) == True:
                        part_cnt[i] += 1
                            
                    # draw the bounding box on the frame
                #     cv2.rectangle(all_frame[i][1], (startX, startY), (endX, endY), (0, 255, 0), 2)
                # cv2.imshow("Text Detection", all_frame[i][1])
            
            # score board 찾기
            for i in range(len(part_cnt)):
                if part_cnt[i] > 20:
                    score_board = i
                    break
        
        # 스코어 보드 찾은 후
        if score_board != -1:
            blob = cv2.dnn.blobFromImage(all_frame[score_board][0], 1.0, (newW, newH),
                (123.68, 116.78, 103.94), swapRB=True, crop=False)
            net.setInput(blob)
            (scores, geometry) = net.forward(layerNames)
            
            (rects, confidences) = decode_predictions(scores, geometry)
            
            boxes = non_max_suppression(np.array(rects), probs=confidences)

            for (startX, startY, endX, endY) in boxes:
                
                startX = int(startX * rW)
                startY = int(startY * rH)
                endX = int(endX * rW)
                endY = int(endY * rH)
                
                text = read_text(all_frame[score_board][1][startY:endY, startX:endX])

                if ts.record(text, sec) == True:
                    part_cnt[i] += 1
                    pass
                        
            #     cv2.rectangle(all_frame[score_board][1], (startX, startY), (endX, endY), (0, 255, 0), 2)
            # cv2.imshow("Text Detection", all_frame[score_board][1])
        
        # 레디스 pub
        import sys
        sys.path.append("..")
        from main import r
        # 로딩퍼센트 전송
        data = 80 * (cnt / total)
        if data >= per:
            msg = "{}".format(10 + per)
            r.publish("ch3", msg)
            per += 1
        
        key = cv2.waitKey(1) & 0xFF
        # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break
        
    # otherwise, release the file pointer
    vs.release()

    # close all windows
    cv2.destroyAllWindows()

    return [ts.pit_records, ts.hit_records]