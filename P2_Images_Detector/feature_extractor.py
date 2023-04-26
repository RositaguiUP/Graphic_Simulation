# Load basic libraries.
import cv2 

# ****************** Features ******************

def getContrast(img):
    grayImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    mean = cv2.mean(grayImg)[0]
    std_dev = cv2.meanStdDev(grayImg)[1][0][0]
    contrast = std_dev / mean
    return contrast

def getBrightness(img):
    grayImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    mean = cv2.mean(grayImg)[0]
    return mean

def getSaturation(img):
    hsvImg = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    h, s, v = cv2.split(hsvImg)
    mean = cv2.mean(s)[0]
    return mean

# ****************** Main ******************

def main():
    image = cv2.imread('./Images/cats/cat1.jpg')
    feat1 = getContrast(image)
    feat2 = getBrightness(image)
    feat3 = getSaturation(image)

    print(f'Contrast: {feat1}')
    print(f'Brightness: {feat2}')
    print(f'Saturation: {feat3}')


main()