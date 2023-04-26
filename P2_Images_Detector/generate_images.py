import cv2
import numpy as np

# Create a black image of size 256x256 pixels
imgB = np.zeros((256, 256), dtype=np.uint8) # Black
imgW = np.ones((256, 256), dtype=np.uint8) * 255 # White


# Save the black image to disk
cv2.imwrite('black.png', imgB)
cv2.imwrite('white.png', imgW)