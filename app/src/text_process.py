from jamo import h2j, j2hcj
from difflib import SequenceMatcher 

# recognition한 text 처리 methods

# 검출한 텍스트가 선수명단에 있는지 검사
# player_names는 리스트
def does_text_in_players(text, players):
	if text == '' or text is None:
		return None
	for i in range(len(players)):
		if players[i].name == text:
			return players[i]
	return None

# 검출한 선수 객체를 result dic에 등록
def process_text(obj, dict, time):
	if obj == '' or obj is None:
		return
	value = dict.get(hash(obj))
	if value is None:
		# print("new text")
		dict[hash(obj)] = [obj, set()]
		dict[hash(obj)][1].add(time)
	else:
		value[1].add(time)

# 선수명단의 각각의 선수이름과 유사도 검사하여 변환
def convert_text(text, players):
	if text == '' or text is None:
		return
	for i in range(len(players)):
		name = players[i].name
		name_tmp = jamo_split(name)
		text = jamo_split(text)
		ratio = SequenceMatcher(None, name_tmp, text).ratio() # 유사도 검사
		if ratio >= 0.75:
			return players[i]
	return None

def jamo_split(word):
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