import math
import os
import pickle
from pathlib import Path

import face_recognition
from django.core.files.storage import default_storage
from sklearn import neighbors
from tqdm import tqdm

from apps.students.models import Student
from .models import StudentTrainFaceImage

MODEL_DIR = "/app/model_data"
MODEL_OUTPUT = os.path.join(MODEL_DIR, "model1.pkl")


def train(queryset_dict: dict, model_save_path=None, n_neighbors=None, knn_algo='ball_tree', verbose=False):
    """
    Trains a k-nearest neighbors classifier for face recognition using a queryset of a Django model with a FileField.

    :param queryset: QuerySet of a Django model with a FileField containing face images.
    :param model_save_path: (optional) path to save model on disk
    :param n_neighbors: (optional) number of neighbors to weigh in classification. Chosen automatically if not specified
    :param knn_algo: (optional) underlying data structure to support knn. Default is ball_tree
    :param verbose: verbosity of training
    :return: returns knn classifier that was trained on the given data.
    """
    try:
        X = []
        y = []
        # Loop through each person in the training set
        student_ids_keys = queryset_dict.keys()
        for student_id_key in tqdm(student_ids_keys):
            is_student_correct = True
            images_list = []
            iantances_list: list[StudentTrainFaceImage] = queryset_dict[student_id_key]
            for instance in iantances_list:
                image_path = instance.image.file.path if instance.image else None
                if image_path is None:
                    if verbose:
                        print("FileModel is none")
                    is_student_correct = False
                    break
                image_path = default_storage.open(image_path).name
                if not default_storage.exists(image_path):
                    if verbose:
                        print("Image {} does not exist. Skipping.".format(image_path))
                    is_student_correct = False
                    break

                # Load the image and perform face recognition
                image = face_recognition.load_image_file(image_path)
                face_bounding_boxes = face_recognition.face_locations(image)
                if len(face_bounding_boxes) != 1:
                    # If there are no people (or too many people) in a training image, skip the image.
                    if verbose:
                        print("Image {} not suitable for training: {}".format(image_path, "Didn't find a face" if len(
                            face_bounding_boxes) < 1 else "Found more than one face"))
                    is_student_correct = False
                    break
                else:
                    # Add face encoding for current image to the training set
                    images_list.append([
                        face_recognition.face_encodings(
                            image, known_face_locations=face_bounding_boxes)[0],
                        str(instance.id)])
                    if verbose:
                        print("Train process for", str(instance.id))

            if not is_student_correct:
                if verbose:
                    print("Could not train for student with id:", student_id_key)
            else:
                for i in images_list:
                    X.append(i[0])
                    y.append(i[1])

        # Determine how many neighbors to use for weighting in the KNN classifier
        if n_neighbors is None:
            n_neighbors = int(round(math.sqrt(len(X))))
            if verbose:
                print("Chose n_neighbors automatically:", n_neighbors)

        # Create and train the KNN classifier
        # knn_clf = neighbors.KNeighborsClassifier(n_neighbors=n_neighbors, algorithm=knn_algo, weights='distance')
        if model_save_path is not None and Path(model_save_path).is_file():
            with open(model_save_path, 'rb') as f:
                if verbose:
                    print("load")
                knn_clf = pickle.load(f)
        else:
            knn_clf = neighbors.KNeighborsClassifier(
                n_neighbors=n_neighbors, algorithm=knn_algo, weights='distance')

        if verbose:
            print("Train data", len(X), len(y))
        if len(X) == 0 or len(y) == 0:
            if os.path.exists(model_save_path):
                os.remove(model_save_path)
            if verbose:
                print("end")
            return False, "Clean successfull"
        knn_clf.fit(X, y)

        # Save the trained KNN classifier
        if model_save_path is not None:
            path = Path(model_save_path)
            with path.open(mode="wb") as f:
                pickle.dump(knn_clf, f)
        if verbose:
            print("end")
        return True, knn_clf
    except Exception as err:
        print("Error", str(err))
        return False, str(err)


def predict(rgb_frame, knn_clf=None, model_path=None, distance_threshold=0.5, verbose=False):
    if knn_clf is None and model_path is None:
        raise Exception(
            "Must supply knn classifier either thourgh knn_clf or model_path")

    # Load a trained KNN model (if one was passed in)
    if knn_clf is None and model_path:
        if not os.path.exists(model_path):
            return []
        with open(model_path, 'rb') as f:
            knn_clf = pickle.load(f)

    # Load image file and find face locations
    # X_img = face_recognition.load_image_file(X_img_path)
    X_face_locations = face_recognition.face_locations(
        rgb_frame, number_of_times_to_upsample=2, )
    # If no faces are found in the image, return an empty result.
    if len(X_face_locations) == 0:
        return []

    # Find encodings for faces in the test iamge
    faces_encodings = face_recognition.face_encodings(rgb_frame)

    if len(faces_encodings) == 0:
        return []
    # Use the KNN model to find the best matches for the test face
    closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
    are_matches = [closest_distances[0][i][0] <=
                   distance_threshold for i in range(len(X_face_locations))]
    # print('are_matches',are_matches, knn_clf.predict(faces_encodings))
    # Predict classes and remove classifications that aren't within the threshold
    return [(pred, loc) if rec else (-1, loc) for pred, loc, rec in
            zip(knn_clf.predict(faces_encodings), X_face_locations, are_matches)]


def identify_faces(image, verbose=False):
    return predict(image, model_path=MODEL_OUTPUT, verbose=verbose)


def start_train_by_student(student: Student):
    students_faces_list_qs = student.train_face_images.all()
    data = {
        student.pk: [],
    }
    for student_face_item in students_faces_list_qs:
        data[student.pk].append(student_face_item)
    return train(data, model_save_path=MODEL_OUTPUT, n_neighbors=3, verbose=True)[0]


def delete_previous_model(model_path=None):
    model_path = MODEL_OUTPUT if model_path is None else model_path
    if model_path:
        if os.path.exists(model_path) and os.path.isfile(model_path):
            os.remove(model_path)


def retrain_faces(students_faces_list_qs):
    data = dict()
    for student_face_item in students_faces_list_qs:
        if not student_face_item.student.pk in data.keys():
            data[student_face_item.student.pk] = []
        data[student_face_item.student.pk].append(student_face_item)
    return train(data, model_save_path=MODEL_OUTPUT, n_neighbors=3, verbose=True)


def find_student_face_item_id_from_face(image_path, verbose=False):
    faces = identify_faces(
        face_recognition.load_image_file(image_path), verbose=verbose)
    if verbose:
        print("find_student_id_from_face", faces)
    if len(faces) > 0:
        my_face = list(faces[0])

        my_face_id = int(my_face[0])
        return my_face_id


def find_student_from_face(image, verbose=False):
    student_face_image_item_id = find_student_face_item_id_from_face(
        image, verbose=verbose)
    if student_face_image_item_id:
        student_face_image_item_id = int(student_face_image_item_id)
        try:
            student_face_image_item = StudentTrainFaceImage.objects.get(
                id=student_face_image_item_id)
            student = student_face_image_item.student
            return student
        except StudentTrainFaceImage.DoesNotExist:
            if verbose:
                print("student_face_image_item not found, id:",
                      student_face_image_item_id)
        except Student.DoesNotExist:
            if verbose:
                print("Student not found")
    return None
