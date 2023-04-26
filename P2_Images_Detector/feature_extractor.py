# Load basic libraries.
import cv2 

def showImage(image) :  
    cv2.imshow("Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# ****************** Features ******************

def getContrast(img):
    grayImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    mean = cv2.mean(grayImg)[0]
    std_dev = cv2.meanStdDev(grayImg)[1][0][0]

    contrast = 1
    if std_dev == 0:
        if mean == 255.0:
            contrast = 0
    else:
        contrast = std_dev / mean
    return contrast

def getBrightness(img):
    grayImg = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    mean = cv2.mean(grayImg)[0]
    brightness = mean / 255.0
    return brightness

def getSaturation(img):
    hsvImg = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    h, s, v = cv2.split(hsvImg)
    mean = cv2.mean(s)[0]
    saturation = mean / 255.0
    return saturation

# ****************** Main ******************

def main():
    image = cv2.imread('./Images/tests/white.png')
    feat1 = getContrast(image)
    feat2 = getBrightness(image)
    feat3 = getSaturation(image)

    print(f'Contrast: {feat1}')
    print(f'Brightness: {feat2}')
    print(f'Saturation: {feat3}')


main()