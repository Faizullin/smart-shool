import pickle, math, pickle, os
from tqdm import tqdm
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
from sklearn import neighbors
from pathlib import Path
from students.models import Student
import numpy as np

from django.core.files.storage import default_storage
from django.core.files import File

PATH = 'accounts_face_recognition/'
MODEL_OUTPUT = PATH + "model_data/models/" + 'model1.clf'
DATASET_PATH = 'media/uploads/face_train/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def train(train_dir, image_paths, model_save_path=None, n_neighbors=3, knn_algo='ball_tree', verbose=False):
    X = []
    y = []

    for img_path in image_paths:
        image = face_recognition.load_image_file(img_path)
        face_bounding_boxes = face_recognition.face_locations(image)

        if len(face_bounding_boxes) != 1:
            if verbose:
                print(f"Image {img_path} not suitable for training: ['Didn't find a face' if len(face_bounding_boxes) < 1 else 'Found more than one face']")
        else:
            X.append(face_recognition.face_encodings(image, known_face_locations=face_bounding_boxes)[0])
            y.append(os.path.basename(os.path.dirname(img_path)))

    n_neighbors = n_neighbors if n_neighbors is not None else int(round(len(X) ** 0.5))
    
    knn_clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors, algorithm=knn_algo, weights='distance')
    
    if model_save_path and Path(model_save_path).is_file():
        with open(model_save_path, 'rb') as f:
            knn_clf = pickle.load(f)

    if not X or not y:
        if os.path.exists(model_save_path):
            os.remove(model_save_path)
        return False, "Clean successful"

    knn_clf.fit(X, y)

    if model_save_path:
        with open(model_save_path, 'wb') as f:
            pickle.dump(knn_clf, f)
    
    return True, knn_clf

def predict(rgb_frame, knn_clf=None, model_path=None, distance_threshold=0.5):
    if knn_clf is None and model_path is None:
        raise Exception("Must supply knn classifier either thourgh knn_clf or model_path")

    # Load a trained KNN model (if one was passed in)
    if knn_clf is None and model_path:
        if not os.path.exists(model_path):
            return []
        with open(model_path, 'rb') as f:
            knn_clf = pickle.load(f)

    # Load image file and find face locations
    # X_img = face_recognition.load_image_file(X_img_path)
    X_face_locations = face_recognition.face_locations(rgb_frame, number_of_times_to_upsample=2,)
    print('X_face_locations', X_face_locations)
    # If no faces are found in the image, return an empty result.
    if len(X_face_locations) == 0:
        return []

    # Find encodings for faces in the test iamge
    faces_encodings = face_recognition.face_encodings(rgb_frame)
    # print('faces_encodings', faces_encodings)
    
    if len(faces_encodings) == 0:
        return []
    # Use the KNN model to find the best matches for the test face
    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
    print('closest_distances',closest_distances)
    are_matches = [closest_distances[0][i][0] <= distance_threshold for i in range(len(X_face_locations))]
    # print('are_matches',are_matches, knn_clf.predict(faces_encodings))
    # Predict classes and remove classifications that aren't within the threshold
    return [(pred, loc) if rec else (-1, loc) for pred, loc, rec in zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]


def predict_user(image_path):
    with open(MODEL_OUTPUT, 'rb') as f:
        knn_clf = pickle.load(f)
    
    rgb_frame = face_recognition.load_image_file(image_path)
    faces_encodings = face_recognition.face_encodings(rgb_frame)
    
    if faces_encodings:
        closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
        if closest_distances:
            return knn_clf.predict(faces_encodings)[0]
    
    return None

def identify_faces(image):
    return predict(image, model_path=MODEL_OUTPUT)

def start_train_by_student(student: Student):
    student_train_face_images = student.train_face_images.all()
    result, m = train(DATASET_PATH, model_save_path=MODEL_OUTPUT, n_neighbors=3 )
    return result

def retrain_faces():
    return train(DATASET_PATH, model_save_path=MODEL_OUTPUT, n_neighbors=3 )[0]

def find_student_id_from_face(image):
    # image = 'media/uploads/face_train/6/image.jpg'
    # faces = identify_faces(image)
    
    # print("find_student_id_from_face", faces)
    faces = identify_faces(face_recognition.load_image_file(image))
    print("find_student_id_from_face", faces)
    if len(faces) > 0:
        my_face = list(faces[0])
        
        my_face_id = int(my_face[0])
        return my_face_id
    
def find_student_from_face(image):
    student_id = find_student_id_from_face(image)
    if student_id:
        student_id = int(student_id)
        student_query =  Student.objects.filter(id=student_id)
        if student_query.exists():
            return student_query.last()
    return None


def test_compare():
    print("Testing")
    for class_dir in tqdm(os.listdir(DATASET_PATH)):
        if not os.path.isdir(os.path.join(DATASET_PATH, class_dir)):
            continue

        # Loop through each training image for the current person
        for img_path in image_files_in_folder(os.path.join(DATASET_PATH, class_dir)):
            print('img_path', img_path, 'from',os.path.join(DATASET_PATH, class_dir))
            
            print(identify_faces(face_recognition.load_image_file(img_path)))
# test_compare()


def start_train_by_student(student: Student, selected_images=None):
    if selected_images is None:
        selected_images = student.train_face_images.all()
    image_paths = [default_storage.path(i.image.name) for i in selected_images]
    result, _ = train(DATASET_PATH, image_paths, model_save_path=MODEL_OUTPUT, n_neighbors=3)
    return result