
from django import forms
from accounts_face_recognition.models import StudentTrainFaceImage

class StudentTrainFaceImageForm(forms.ModelForm):    
    class Meta:
        model = StudentTrainFaceImage
        fields = ['id','student','train_face_image',]