import face_recognition
import os
import cv2
import numpy as np

path = ""                   #Add Your url "D:/study/sem-7/4IT31/Lab/admin-project/Face"
images = []
classNames = mylist = os.listdir(path)
classNames = [sub[ : -4] for sub in classNames]
# print(mylist)
for cl in mylist:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encoded_face = face_recognition.face_encodings(img)[0]
        encodeList.append(encoded_face)
    return encodeList
encoded_face_train = findEncodings(images)