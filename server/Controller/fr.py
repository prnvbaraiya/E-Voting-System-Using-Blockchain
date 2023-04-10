import cv2
import face_recognition
import numpy as np
from encoded import encoded_face_train,classNames

cap  = cv2.VideoCapture(1)      # Adjust 0 or 1 according to your camera input
cap.set(cv2.CAP_PROP_FRAME_WIDTH,1024)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT,768)
flag = 0
ans=[]
index = 0

while True:
    index += 1
    if(index == 500):       #Change according to your need
        break
    success, img = cap.read()
    imgS = cv2.resize(img, (0,0), None, 0.25,0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
    faces_in_frame = face_recognition.face_locations(imgS)
    encoded_faces = face_recognition.face_encodings(imgS, faces_in_frame)
    for encode_face, faceloc in zip(encoded_faces,faces_in_frame):
        matches = face_recognition.compare_faces(encoded_face_train, encode_face)
        faceDist = face_recognition.face_distance(encoded_face_train, encode_face)
        matchIndex = np.argmin(faceDist)
        if matches[matchIndex]:
            # print(classNames[matchIndex])
            ans.append(classNames[matchIndex])
            flag+=1
            break
    # cv2.imshow('webcam', img)
    if (cv2.waitKey(1) & 0xFF == ord('q')) or flag==10:
#         cap.release()
#         cv2.destroyAllWindows()
        print(max(set(ans), key = ans.count))
        break
cap.release()
cv2.destroyAllWindows()
