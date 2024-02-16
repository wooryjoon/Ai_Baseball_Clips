# 
FROM python:3.9

# 
WORKDIR /app

# 
COPY ./requirements.txt /app/requirements.txt

RUN apt-get update

RUN apt-get -y install libgl1-mesa-glx

RUN apt-get -y install tesseract-ocr

# 
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# 
COPY ./app/ /app/

# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]