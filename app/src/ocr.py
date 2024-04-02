import numpy as np
import pytesseract
import re

from .image_process import get_grayscale

# text detection + text recognition methods

min_confidence = 0.5 # minimum probability required to inspect a region

def decode_predictions(scores, geometry):
	# grab the number of rows and columns from the scores volume, then
	# initialize our set of bounding box rectangles and corresponding
	# confidence scores
	(numRows, numCols) = scores.shape[2:4]
	rects = []
	confidences = []

	# loop over the number of rows
	for y in range(0, numRows):
		# extract the scores (probabilities), followed by the
		# geometrical data used to derive potential bounding box
		# coordinates that surround text
		scoresData = scores[0, 0, y]
		xData0 = geometry[0, 0, y]
		xData1 = geometry[0, 1, y]
		xData2 = geometry[0, 2, y]
		xData3 = geometry[0, 3, y]
		anglesData = geometry[0, 4, y]

		# loop over the number of columns
		for x in range(0, numCols):
			# if our score does not have sufficient probability,
			# ignore it
			if scoresData[x] < min_confidence:
				continue

			# compute the offset factor as our resulting feature
			# maps will be 4x smaller than the input image
			(offsetX, offsetY) = (x * 4.0, y * 4.0)

			# extract the rotation angle for the prediction and
			# then compute the sin and cosine
			angle = anglesData[x]
			cos = np.cos(angle)
			sin = np.sin(angle)

			# use the geometry volume to derive the width and height
			# of the bounding box
			h = xData0[x] + xData2[x]
			w = xData1[x] + xData3[x]

			# compute both the starting and ending (x, y)-coordinates
			# for the text prediction bounding box
			endX = int(offsetX + (cos * xData1[x]) + (sin * xData2[x]))
			endY = int(offsetY - (sin * xData1[x]) + (cos * xData2[x]))
			startX = int(endX - w)
			startY = int(endY - h)

			# add the bounding box coordinates and probability score
			# to our respective lists
			rects.append((startX, startY, endX, endY))
			confidences.append(scoresData[x])

	# return a tuple of the bounding boxes and associated confidences
	return (rects, confidences)

def read_text(image):
	if image.all() == True or image is None:
		return None
	image = get_grayscale(image)
	# apply Tesseract v4 to OCR 
	config = ('-l kor --oem 3 --psm 11')
	# tesseract 읽지 못하는 에러방지 위해 tesseract 직접 설치 후
	# pytesseract 메서드 사용전에 설치 경로 입력해줌
	# pytesseract.pytesseract.tesseract_cmd = r'C:\Users\SSAFY\anaconda3\envs\AI_server\Tesseract-OCR\tesseract.exe'
	# text OCR'd by Tesseract
	text = pytesseract.image_to_string(image, config=config)
 
	# text OCR'd by Tesseract에서 한글만 추출
	text = re.sub(r"[^ㄱ-ㅣ가-힣]", "", text)
	return text