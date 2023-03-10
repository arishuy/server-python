import pyrebase 
# Import Modules for FLASK
from flask import Flask, Response, jsonify, request
import numpy as np
from PIL import Image
import cv2 as cv
import io
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

global haarcascade_face
haarcascade_face = cv.CascadeClassifier('haar_frontalface.xml')

# Initialize Flask app

firebaseConfig = {
    'apiKey': "AIzaSyDx7NgpRy5x10a8mUXMhweqfGUZUeXNMnI",
    'authDomain': "pbl5-e18b0.firebaseapp.com",
    'projectId': "pbl5-e18b0",
    'storageBucket': "pbl5-e18b0.appspot.com",
    'messagingSenderId': "764037082107",
    'appId': "1:764037082107:web:e5bc7759fae0e67052395e",
    'measurementId': "G-XVH2L471WS",
    'databaseURL': 'https://pbl5.web.app/'
  }
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
@app.route('/' , methods=['GET'])
def hello():
    return "Hello World"
@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return jsonify(user)
    except:
        return jsonify({"error": "Invalid credentials"}), 401
@app.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    try:
        user = auth.create_user_with_email_and_password(email, password)
        return jsonify(user)
    except:
        return jsonify({"error": "Invalid credentials"}), 401

def gen():
    cap = cv.VideoCapture(0)
    while True:
        ret, frame = cap.read()

        if not ret:
            print("Error: failed to capture image")
            break

        cv.imwrite('demo.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + open('demo.jpg', 'rb').read() + b'\r\n')


def face_detect():
    cap = cv.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        frame = cv.flip(frame, 1)
        # frame = cv.imread('./group.jpg')
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        # gray = cv.GaussianBlur(gray, (5, 5), 0)
        face_rec = haarcascade_face.detectMultiScale(
            gray, scaleFactor=1.3, minNeighbors=5)
        for (x, y, w, h) in face_rec:
            cv.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), thickness=2)

        if not ret:
            print("Error: failed to capture image")
            break

        cv.imwrite('demo.jpg', frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + open('demo.jpg', 'rb').read() + b'\r\n')


@app.route('/video')
def video():
    return Response(face_detect(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/face_detect', methods=['POST'])
def face_detect():
    data = {"success": False}
    if request.files.get("image"):
        image = request.files["image"].read()
        image = Image.open(io.BytesIO(image))
        image = np.asarray(image)
        image = cv.cvtColor(image, cv.COLOR_RGB2BGR)
        cv.imwrite('1.jpg', image)
        gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
        face_rec = haarcascade_face.detectMultiScale(
            gray, scaleFactor=1.3, minNeighbors=5)
        bboxes = []
        for (x, y, w, h) in face_rec:
            bboxes.append([int(x), int(y), int(w), int(h)])
        if len(bboxes) > 0:
            data["bboxes"] = bboxes
        data["success"] = True
    return data


if __name__ == "__main__":
    app.run(debug=True) # Make sure debug is false on production environment
