import cv2
import numpy as np
from time import time
import tensorflow as tf
from tensorflow.keras.applications.mobilenet import preprocess_input


loaded_model = tf.keras.models.load_model("save_model/")


def predict_attention(img):
    label_mapping = {0: "attention", 1: "not_attention"}
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(img_array)
    predictions = loaded_model.predict(preprocessed_img, verbose=0)
    output = np.argmax(predictions, axis=-1)
    output_categories = [label_mapping[label] for label in output]
    return output_categories


face_net = cv2.dnn.readNetFromCaffe('deploy.prototxt', 'res10_300x300_ssd_iter_140000.caffemodel')


start_time = time()
capture_interval = 0.1  


cap = cv2.VideoCapture(0)

while True:

    if time() - start_time >= capture_interval:
        # Reset the timer
        start_time = time()


        ret, frame = cap.read()


        h, w = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))


        face_net.setInput(blob)
        detections = face_net.forward()

        for i in range(detections.shape[2]):
            confidence = detections[0, 0, i, 2]

            if confidence > 0.5:  
                box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                (x, y, x1, y1) = box.astype("int")


                x, y = max(0, x - 20), max(0, y - 20)
                x1, y1 = min(w, x1 + 20), min(h, y1 + 20)
                only_face = frame[y:y1, x:x1]


                resized = cv2.resize(only_face, (224, 224), interpolation=cv2.INTER_AREA)

                result = predict_attention(resized)
                label_position = (x, y)
                cv2.rectangle(frame, (x, y), (x1, y1), (255, 0, 0), 2)
                cv2.putText(frame, result[0], label_position, cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
                print(result)


        cv2.imshow('Attention Detector', frame)


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


cap.release()
cv2.destroyAllWindows()
