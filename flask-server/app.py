import pyrebase 
import cv2
# Import Modules for FLASK
from flask import Flask, Response, jsonify, request
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin

# Initialize Flask app
app = Flask(__name__)
CORS(app, support_credentials=True)
api = Api(app)

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
def gen():
    cap = cv2.VideoCapture(0)

    while True:
        _, frame = cap.read()
        frame = cv2.flip(frame, 1)
        cv2.imwrite('frame.jpg', frame)
        yield (open ('frame.jpg', 'rb').read())

@app.route("/video")
def video():
    return Response(gen(), mimetype='multipart/x-mixed-replace; boundary=frame')
if __name__ == "__main__":
    app.run(debug=True) # Make sure debug is false on production environment