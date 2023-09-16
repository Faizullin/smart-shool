import pickle, math, pickle, os
from tqdm import tqdm
import face_recognition
from face_recognition.face_recognition_cli import image_files_in_folder
from sklearn import neighbors
from pathlib import Path
from django.core.files import File
from students.models import Student
import numpy as np

PATH = 'accounts_face_recognition/'
MODEL_OUTPUT = PATH + "model_data/models/" + 'model1.clf'
DATASET_PATH = 'media/uploads/face_train/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def train(train_dir, model_save_path=None, n_neighbors=None, knn_algo='ball_tree', verbose=False):
    """
    Trains a k-nearest neighbors classifier for face recognition.

    :param train_dir: directory that contains a sub-directory for each known person, with its name.

     (View in source code to see train_dir example tree structure)

     Structure:
        <train_dir>/
        ├── <person1>/
        │   ├── <somename1>.jpeg
        │   ├── <somename2>.jpeg
        │   ├── ...
        ├── <person2>/
        │   ├── <somename1>.jpeg
        │   └── <somename2>.jpeg
        └── ...

    :param model_save_path: (optional) path to save model on disk
    :param n_neighbors: (optional) number of neighbors to weigh in classification. Chosen automatically if not specified
    :param knn_algo: (optional) underlying data structure to support knn.default is ball_tree
    :param verbose: verbosity of training
    :return: returns knn classifier that was trained on the given data.
    """
    try:
        X = []
        y = []

        # Loop through each person in the training set
        for class_dir in tqdm(os.listdir(train_dir)):
            if not os.path.isdir(os.path.join(train_dir, class_dir)):
                continue

            # Loop through each training image for the current person
            for img_path in image_files_in_folder(os.path.join(train_dir, class_dir)):
                print('img_path', img_path, 'from',os.path.join(train_dir, class_dir))
                image = face_recognition.load_image_file(img_path)
                face_bounding_boxes = face_recognition.face_locations(image)
                print('face_bounding_boxes',face_bounding_boxes)

                if len(face_bounding_boxes) != 1:
                    # If there are no people (or too many people) in a training image, skip the image.
                    if verbose:
                        print("Image {} not suitable for training: {}".format(img_path, "Didn't find a face" if len(face_bounding_boxes) < 1 else "Found more than one face"))
                else:
                    # Add face encoding for current image to the training set
                    X.append(face_recognition.face_encodings(image, known_face_locations=face_bounding_boxes)[0])
                    y.append(class_dir)
                    print("Train process for",class_dir)

        # Determine how many neighbors to use for weighting in the KNN classifier
        if n_neighbors is None:
            n_neighbors = int(round(math.sqrt(len(X))))
            if verbose:
                print("Chose n_neighbors automatically:", n_neighbors)

        # Create and train the KNN classifier
        # knn_clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors, algorithm=knn_algo, weights='distance')
        if model_save_path is not None and Path(model_save_path).is_file():
            with open(model_save_path, 'rb') as f:
                print("load")
                knn_clf = pickle.load(f)
        else:
            knn_clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors, algorithm=knn_algo, weights='distance')

        print("Train data",len(X),len(y))
        if len(X) == 0 or len(y) == 0:
            if os.path.exists(model_save_path):
                os.remove(model_save_path)
            print("end")
            return False, "Clean successfull"
        knn_clf.fit(X, y)

        # Save the trained KNN classifier
        if model_save_path is not None:
            path = Path(model_save_path)
            with path.open(mode="wb") as f:
                pickle.dump(knn_clf,f)
        print("end")
        return True, knn_clf
    except Exception as err:
        print("Error", str(err))
        return False, str(err)

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