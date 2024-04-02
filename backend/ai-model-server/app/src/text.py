from jamo import h2j, j2hcj
from difflib import SequenceMatcher

from sql.database import DB
from dotenv import load_dotenv
import os
from sql.crud import Cursor
from sql.models import Hitter, Pitcher

# recognition한 text 처리 methods

class Text_Store:
	def __init__(self, total, fps):
		self.players = []
		
		time = int(total / fps) + 1
		self.pit_records = []
		self.hit_records = []
		for i in range(time):
			self.pit_records.append(set())
			self.hit_records.append(set())
  
	def get_players(self):
		# 선수 데이터 가져오기
		try:
			myDB = DB(os.getenv("db_host"), os.getenv("db_user") , os.getenv("db_passwd"), os.getenv("db_name"))
			curs = Cursor(myDB.connect())
			# curs.insert()
			hitters = curs.select_hitters()
			pitchers = curs.select_pitchers()
			for i in range(len(hitters)):
				self.players.append(Hitter(**hitters[i])) # hitter 클래스로 변환
			for i in range(len(pitchers)):
				self.players.append(Pitcher(**pitchers[i])) # pitcher 클래스로 변환
		finally:
			curs.close()
			myDB.close()

	def record(self, text, sec):
		res = self.does_text_in_players(text, sec)
		return res

	# text, sec으로 이루어진 객체 만들기
	# 밑의 함수들 묶어서 text_driver 만들기
	def does_text_in_players(self, text, sec):
		if text == '' or text is None:
			return None

		for i in range(len(self.players)):
			if self.players[i].name == text:
				self.process_text(self.players[i], sec)
				# print("True", str(sec) +  "초", text + "\n")
				return True # 기록됨
		converted = self.convert_text(text, sec)
		return converted

	def convert_text(self, text, sec):
		for i in range(len(self.players)):
			name = self.players[i].name
			name_tmp = self.jamo_split(name)
			text_tmp = self.jamo_split(text)
			ratio = SequenceMatcher(None, name_tmp, text_tmp).ratio() # 유사도 검사
			if ratio >= 0.75: 
				self.process_text(self.players[i], sec)
				# print("False", str(sec) + "초", text + "\n")
				return True # 기록가능
		# print("False", str(sec) + "초", text + "\n")
		return False

	def process_text(self, obj, sec):
		if obj == '' or obj is None:
			return

		if isinstance(obj, Pitcher) == True:
			self.pit_records[sec].add(obj)
		if isinstance(obj, Hitter) == True:
			self.hit_records[sec].add(obj)

	def jamo_split(self, word):
		jamo = j2hcj(h2j(word))
		# 이중모음도 분리
		dic = {'ㅐ':'ㅏㅣ','ㅒ':'ㅑㅣ','ㅔ':'ㅓㅣ','ㅖ':'ㅕㅣ',
		'ㅘ':'ㅗㅏ','ㅙ':'ㅗㅐ','ㅚ':'ㅗㅣ','ㅝ':'ㅜㅓ',
		'ㅞ':'ㅜㅔ','ㅟ':'ㅜㅣ','ㅢ':'ㅡㅣ',
		'ㄳ' : 'ㄱㅅ', 'ㄵ' : 'ㄴㅈ', 'ㄶ' : 'ㄴㅎ','ㄺ' : 'ㄹㄱ',
		'ㄻ' : 'ㄹㅁ', 'ㄼ' : 'ㄹㅂ', 'ㄽ' : 'ㄹㅅ', 'ㄾ' : 'ㄹㅌ', 
		'ㄿ' : 'ㄹㅍ', 'ㅀ' : 'ㄹㅎ', 'ㅄ' : 'ㅂㅅ', 'ㄲ' : 'ㄱㄱ', 'ㅆ' : 'ㅅㅅ'}
		for i in jamo:
			if i in dic.keys():
				jamo = jamo.replace(i,dic[i])
		return jamo