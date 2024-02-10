import mysql.connector

def connect_to_mysql():
    conn = mysql.connector.connect(
    host="i10a305.p.ssafy.io",
    user="a305",
    passwd="305",
    database="abc"
    )
    return conn