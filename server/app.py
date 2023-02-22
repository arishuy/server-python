import pyrebase 
# Import Modules for FLASK
from flask import Flask, Response, jsonify, request

# Initialize Flask app
app = Flask(__name__)

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
if __name__ == "__main__":
    app.run(debug=True) # Make sure debug is false on production environment