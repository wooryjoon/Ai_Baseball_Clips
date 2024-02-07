from fastapi import FastAPI, UploadFile
import uvicorn
import asyncio
import aioredis
import json
import os

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
            main(dic_path)
            # pub
            await r.publish("ch1", json.dumps({"localPath" : dic_path}))
                
    asyncio.get_running_loop().create_task(read(ch))

if __name__ == "__main__":
    asyncio.run(set_redis())
    uvicorn.run("main:app", reload=True)

def main(dic_path):
    if dic_path is not None:
        file_list = os.listdir(dic_path)
        video_path = dic_path + "\\" + file_list[0]
    else:
        return
    
    result = process_video(video_path)
    process_result(video_path, result)
    
    # 원본영상 삭제
    # if os.path.isfile(video_path):
    #     os.remove(video_path)