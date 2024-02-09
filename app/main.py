from fastapi import FastAPI
import uvicorn
import asyncio
import aioredis
import json
import os
import traceback

from src.video_process import process_video
from src.clip_process import *
# from pytube import YouTube

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

# 서버 로딩되면 redis 자동연결 및 채널구독
@app.on_event("startup")
async def set_redis():
    # connect
    # r = await aioredis.create_redis_pool("redis://i10a305.p.ssafy.io:6379", password="a305#@!")
    r = await aioredis.create_redis_pool("redis://localhost")
    # sub
    ch, = await r.subscribe("ch2")
    assert isinstance(ch, aioredis.Channel)
    
    async def read(channel):
        async for message in channel.iter():
            print("Got message:", message) # bytes 타입
            # json.loads : json -> dic
            # decode("utf-8") : string으로 decoding
            path_obj = json.loads(message.decode("utf-8"))
            # 디렉토리 주소
            dic_path = path_obj["localPath"]
            try:
                main(dic_path)
                await r.publish("ch1", json.dumps({"localPath" : dic_path}))
            except Exception:
                # 비디오 편집 과정에서 에러 발생시 text 파일에 기록하여 전달
                print("error 발생하여 error text 파일")
                e = str(traceback.format_exc())
                localPath = dic_path + "\\\\error_desc_1.txt"
                f = open(localPath, "w")
                f.write(e)
                f.close()
            # pub
            await r.publish("ch1", json.dumps({"localPath" : dic_path}))
                
    asyncio.get_running_loop().create_task(read(ch))

if __name__ == "__main__":
    asyncio.run(set_redis())
    uvicorn.run("main:app", reload=True)

def main(dic_path):
    file_list = os.listdir(dic_path)
    video_path = dic_path + "\\" + file_list[0]
    
    result = process_video(video_path)
    process_result(video_path, result)
    
    # 원본영상 삭제
    if os.path.isfile(video_path):
        os.remove(video_path)