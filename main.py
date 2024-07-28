import tensorflow as tf
from time import time
import cv2
import numpy as np
from mtcnn.mtcnn import MTCNN
from tensorflow.keras.applications.mobilenet import preprocess_input
import matplotlib.pyplot as plt

# Load the saved model
loaded_model = tf.keras.models.load_model("save_model/")

# Function to predict attention
def predict_attention(img):
    label_mapping = {0: "attention", 1: "not_attention"}
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    preprocessed_img = preprocess_input(img_array)
    predictions = loaded_model.predict(preprocessed_img, verbose=0)
    output = np.argmax(predictions, axis=-1)
    output_categories = [label_mapping[label] for label in output]
    return output_categories

# Create MTCNN detector
detector = MTCNN()



# Initialize time variables
start_time = time()
capture_interval = 0.1 # Capture interval in seconds

# Start capturing video from the camera
cap = cv2.VideoCapture(0)

while True:
    # Check if it's time to capture a frame
    if time() - start_time >= capture_interval:
        # Reset the timer
        start_time = time()

        # Grab a single frame of video
        ret, frame = cap.read()

        # Perform face detection
        try:
            output = detector.detect_faces(frame)
            for face_data in output:
                x, y, w, h = face_data["box"]
                only_face = frame[y-20:y+h+20, x-20:x+w+20]
                plt.imshow(only_face)
                
                
                # Resize the face for prediction
                resized = cv2.resize(only_face, (224, 224), interpolation=cv2.INTER_AREA)
                # print(resized)
                
                result = predict_attention(resized)
                label_position = (x, y)
                cv2.rectangle(frame, (x-20, y-20), (x + w+20, y + h+20), (255, 0, 0), 2)
                cv2.putText(frame, result[0], label_position, cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
                print(result)
        except Exception as e:
            print("Error occurred:", e)

        # Display the frame
        cv2.imshow('Emotion Detector', frame)

    # Check for 'q' key press to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture object and close all windows
cap.release()
cv2.destroyAllWindows()
