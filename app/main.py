from fastapi import FastAPI
import uvicorn
import asyncio
import aioredis
import json
import traceback
from dotenv import load_dotenv
import os

from src.main_process import main

app = FastAPI()

@app.get("/")
def root():
    return

# 서버 로딩되면 redis 자동연결 및 채널구독
@app.on_event("startup")
async def set_redis():
    # redis connect
    global r
    r = await aioredis.create_redis_pool(os.getenv("redis_url"), password=os.getenv("redis_passwd"))
    # r = await aioredis.create_redis_pool("redis://localhost")
    # redis sub
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
                # loading 페이지에 정보를 날려주는 pub
                await r.publish("ch3", "10")
                main(dic_path)
                await r.publish("ch3", "100")
            except Exception:
                print("error 발생")
                e = str(traceback.format_exc())
                print(e)
            finally:
                # redis pub
                await r.publish("ch1", json.dumps({"localPath" : dic_path}))
                
    asyncio.get_running_loop().create_task(read(ch))

if __name__ == "__main__":
    asyncio.run(set_redis())
    uvicorn.run("main:app", reload=True)
