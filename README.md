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

## Dataset

The dataset contains 600 pictures of children's faces. These images were used to fine-tune the pre-trained MobileNet model for better accuracy in detecting children's faces and their attention.

data set password hit - "my guitar brand name & model number"

### a few samples

![20240219_104227](https://github.com/user-attachments/assets/212cd397-b837-4951-ae2f-4bf6cd4136a2)
![20240219_104336](https://github.com/user-attachments/assets/778b6715-c19d-499c-97a3-ae0dfccf9c5b)
![20240219_113841](https://github.com/user-attachments/assets/d63184bf-d571-4539-94bc-357b6cc10ea4)
![WIN_20240220_09_22_38_Pro](https://github.com/user-attachments/assets/4ff7631d-6ced-4ed4-a7a5-4c68242b5fb6)


## Model and Training

A pre-trained MobileNet model was fine-tuned using the collected dataset of children's faces. MobileNet was chosen for its efficiency and accuracy in image recognition tasks.

## Implementation

The project is implemented using a Flask backend and a React frontend. The Flask backend handles the model inference and API requests, while the React frontend manages the user interface and webcam interactions.


