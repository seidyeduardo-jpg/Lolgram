from django.shortcuts import render, redirect
from django.contrib.auth.views import LoginView
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views import View
from django.contrib.auth.models import User
from .forms import RegisterForm, LoginForm, UpdateUserForm, UpdateProfileForm
import cv2
import os
import uuid
import time 
from django.conf import settings

class FaceDetector:
    def __init__(self, minDetectionCon=0.5):
        self.minDetectionCon = minDetectionCon
        self.faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    def findFaces(self, img, draw=True):
        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = self.faceCascade.detectMultiScale(imgGray, 1.1, 4)
        bboxs = []
        for (x, y, w, h) in faces:
            bbox = {'id': 0, 'bbox': (x, y, w, h), 'score': self.minDetectionCon}
            bboxs.append(bbox)
            if draw:
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 255), 2)
        return img, bboxs

def capture_face_view(request):
    if 'register_username' not in request.session:
        messages.error(request, "Registration session expired.")
        return redirect('register')
    
    username = request.session['register_username']
    
    if request.method == 'POST':
        try:
            face_image = capture_face()
            
            if face_image:
                user = User.objects.get(username=username)
                
                face_dir = os.path.join(settings.MEDIA_ROOT, f'face_recognition/user_{user.id}')
                os.makedirs(face_dir, exist_ok=True)
                
                image_filename = f"face_{uuid.uuid4()}.jpg"
                image_path = os.path.join(face_dir, image_filename)
                
                cv2.imwrite(image_path, face_image)
                
                rel_path = f'face_recognition/user_{user.id}/{image_filename}'
                user.profile.face_image = rel_path
                user.profile.face_recognition_enabled = True
                user.profile.save()
                
                messages.success(request, f'Face recognition setup completed for {username}')
                return redirect('c_user_ok')
            else:
                messages.error(request, "Face detection failed. Please try again.")
        except Exception as e:
            messages.error(request, f"Error during face capture: {str(e)}")
    
    return render(request, 'users/capture_face.html', {'username': username})

def capture_face():
    video = cv2.VideoCapture(0)
    detector = FaceDetector()
    
    start_time = time.time()
    max_wait_time = 10
    face_detected = False
    face_image = None
    
    while (time.time() - start_time) < max_wait_time:
        success, img = video.read()
        if not success:
            break
            
        img, bboxes = detector.findFaces(img, draw=True)
        
        if bboxes:
            if not face_detected:
                face_detected = True
                face_detected_time = time.time()
            
            if (time.time() - face_detected_time) > 2:
                face_image = img.copy()
                break
                
        cv2.putText(img, "Posicione seu rosto na camera", (20, 50), 
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('Registro Facial', img)
        
        if cv2.waitKey(1) == 27:
            break
    
    video.release()
    cv2.destroyAllWindows()
    
    return face_image

def public_profile(request, username):
    try:
        user = User.objects.get(username=username)
        user_form = UpdateUserForm(instance=user)
        profile_form = UpdateProfileForm(instance=user.profile)
        
        for field in user_form.fields.values():
            field.disabled = True
        for field in profile_form.fields.values():
            field.disabled = True
            
        context = {
            'user': user,
            'user_form': user_form,
            'profile_form': profile_form,
            'view_only': True
        }
    except User.DoesNotExist:
        japanese_users = {
            "正弘秀": "/static/image/icone01.jpg",
            "鈴木梓": "/static/image/icone02.jpg",
            "篠田あゆみ": "/static/image/icone03.jpg",
            "山の守": "/static/image/icone04.jpg",
            "雨の詩": "/static/image/icone05.jpg",
            "太陽の子": "/static/image/icone06.jpg",
            "夢の旅人": "/static/image/icone07.jpg",
            "星の光": "/static/image/icone08.jpg",
            "森の精": "/static/image/icone09.jpg",
            "川の声": "/static/image/icone10.jpg",
            "田中聖治": "/static/image/game.jpeg",
            "ブライアン": "/static/image/game2.jpg"
        }
        
        class TempUser:
            def __init__(self, username, avatar_url):
                self.username = username
                self.profile = type('obj', (object,), {
                    'avatar': type('obj', (object,), {
                        'url': avatar_url
                    })
                })
        
        avatar_url = japanese_users.get(username, "/static/image/default-avatar.jpg")
        user = TempUser(username, avatar_url)
        
        user_form = UpdateUserForm()
        profile_form = UpdateProfileForm()
        
        context = {
            'user': user,
            'user_form': user_form,
            'profile_form': profile_form,
            'view_only': True
        }
    
    return render(request, 'users/profile.html', context)


def index(request):
    return render(request, 'users/index.html')

def game(request):
    return render(request, 'users/game.html')

def champ(request):
    return render(request, 'users/champ.html')

def player(request):
    return render(request, 'users/player.html')

def home(request):
    return render(request, 'home.html')

def c_user_ok(request):
    return render(request, 'users/c_user_ok.html')

class RegisterView(View):
    form_class = RegisterForm
    template_name = 'users/home.html'
    
    def get(self, request):
        form = self.form_class()
        return render(request, self.template_name, {
            'form': form,
            'enable_face_recognition': True
        })

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            
            use_face_recognition = request.POST.get('use_face_recognition') == 'on'
            
            if use_face_recognition:
                request.session['register_username'] = username
                return redirect('capture_face')
            else:
                messages.success(request, f'Account created for {username}')
                return redirect('c_user_ok')
                
        return render(request, self.template_name, {'form': form})
    
class CustomLoginView(LoginView):
    template_name = 'users/login.html'
    form_class = LoginForm

    def form_valid(self, form):
        remember_me = form.cleaned_data.get('remember_me')
        if not remember_me:
            self.request.session.set_expiry(0)
            self.request.session.modified = True
        return super().form_valid(form)

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UpdateUserForm(request.POST, instance=request.user)
        profile_form = UpdateProfileForm(request.POST, request.FILES, instance=request.user.profile)
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect('index')
    else:
        user_form = UpdateUserForm(instance=request.user)
        profile_form = UpdateProfileForm(instance=request.user.profile)

    return render(request, 'users/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })