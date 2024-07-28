import cv2 as cv2
import matplotlib.pyplot as plt
import tensorflow as tf
import os


from mtcnn.mtcnn import MTCNN


def face_detector(image_path , new_img_path):
    try:
        img = cv2.imread(image_path)
        det = MTCNN()
        output = det.detect_faces(img)
        
        if output:
            x, y, w, h = output[0]["box"]
            only_face = img[y:y+h, x:x+w]
            folder= image_path.split("\\")
            image_name = folder[-1] 
            
            cv2.imwrite(new_img_path + '\\' +image_name , only_face)
            # plt.imshow(only_face)
            return only_face
        else:
            print("No face detected in the image.")
            return None

    except Exception as e:
        print("Error occurred:", e)
        return None
    

def get_image_names(folder_path):
    image_path_names = []
    for file in os.listdir(folder_path):
        if file.endswith(".jpg") or file.endswith(".jpeg") or file.endswith(".png") or file.endswith(".gif"):
            # print(file)
            # imageName = os.path.splitext(file)[0]
            # print(imageName)
            image_path =folder_path + "\\" + file
            # print(image_path)
            image_path_names.append(image_path)
    return image_path_names




def main():
    
    input_folder_path = input("Enter the folder path where the images are : ")

    output_folder_path = input("Enter the folder path where you want to save the new images: ")

    
    image_list =get_image_names(input_folder_path)

    for name in image_list:
        print(name)
        x =face_detector(name, output_folder_path)


if __name__ == "__main__":
    main()