import cv2

# 이미지 전처리 methods

# get grayscale image
def get_grayscale(image):
	if image.all() == True or image is None:
		return
	return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 이미지 자르기
def img_trim(img, x, y, w, h):
    imgtrim = img[y: y + h, x: x + w]
    return imgtrim