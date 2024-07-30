# Online Exam Attention Checker for Children

This project aims to ensure children pay attention during online exams by monitoring their faces using a webcam. The system uses a pre-trained MobileNet model fine-tuned with a dataset of children's faces to detect if they are looking at the screen.



## Table of Contents

- [Overview](#overview)
- [Dataset](#dataset)
- [Model and Training](#model-and-training)
- [Implementation](#implementation)


## Overview

This project was developed to help maintain the integrity of online exams for children by ensuring they are paying attention to the screen. It uses a webcam to capture the child's face and a fine-tuned MobileNet model to determine if the child is looking at the screen.

https://github.com/user-attachments/assets/87760e47-d582-4184-a572-9a56db69aedc

https://github.com/user-attachments/assets/690e005f-dcc0-482a-9049-ef0c5439335c

## Dataset

The dataset contains 600 pictures of children's faces. These images were used to fine-tune the pre-trained MobileNet model for better accuracy in detecting children's faces and their attention.

data set password hit - "my guitar brand name & model number"

### a few samples
![20240219_104227](https://github.com/user-attachments/assets/35bc3b32-c975-4615-941c-761bb004e2bd)
![20240219_104336](https://github.com/user-attachments/assets/10d3457d-deb7-4e93-b796-133672bf2d7d)
![20240219_113841](https://github.com/user-attachments/assets/e76a6b50-c3e9-4b0a-96f0-d6b199e6dbdb)
![WIN_20240220_09_22_38_Pro](https://github.com/user-attachments/assets/60d99659-a73c-41f3-beda-2f8f5f2f967d)



## Model and Training

A pre-trained MobileNet model was fine-tuned using the collected dataset of children's faces. MobileNet was chosen for its efficiency and accuracy in image recognition tasks.

## Implementation

The project is implemented using a Flask backend and a React frontend. The Flask backend handles the model inference and API requests, while the React frontend manages the user interface and webcam interactions.


