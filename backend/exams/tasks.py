# from django.shortcuts import render, redirect
# # from .forms import FaceVerificationForm
# from .models import Exam
# import face_recognition

# def start_exam(request, exam_id):
#     exam = Exam.objects.get(id=exam_id)

#     if request.method == 'POST':
#         form = FaceVerificationForm(request.POST, request.FILES)
#         if form.is_valid():
#             # Perform face recognition and verification
#             face_image = form.cleaned_data['face_image']
#             known_image = face_recognition.load_image_file(exam.face_image.path)
#             unknown_image = face_recognition.load_image_file(face_image.path)

#             known_encoding = face_recognition.face_encodings(known_image)[0]
#             unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

#             results = face_recognition.compare_faces([known_encoding], unknown_encoding)
#             if results[0]:
#                 # Face matched, start the exam
#                 # Add your exam start logic here
#                 return redirect('exam:exam_started', exam_id=exam.id)
#             else:
#                 # Face didn't match, display an error message
#                 form.add_error('face_image', 'Face verification failed. Please try again.')

#     else:
#         form = FaceVerificationForm()

#     return render(request, 'start_exam.html', {'exam': exam, 'form': form})

# def end_exam(request, exam_id):
#     exam = Exam.objects.get(id=exam_id)

#     if request.method == 'POST':
#         form = FaceVerificationForm(request.POST, request.FILES)
#         if form.is_valid():
#             # Perform face recognition and verification
#             face_image = form.cleaned_data['face_image']
#             known_image = face_recognition.load_image_file(exam.face_image.path)
#             unknown_image = face_recognition.load_image_file(face_image.path)

#             known_encoding = face_recognition.face_encodings(known_image)[0]
#             unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

#             results = face_recognition.compare_faces([known_encoding], unknown_encoding)
#             if results[0]:
#                 # Face matched, end the exam
#                 # Add your exam end logic here
#                 return redirect('exam:exam_ended', exam_id=exam.id)
#             else:
#                 # Face didn't match, display an error message
#                 form.add_error('face_image', 'Face verification failed. Please try again.')

#     else:
#         form = FaceVerificationForm()

#     return render(request, 'end_exam.html', {'exam': exam,})