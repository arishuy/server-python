import firebase_admin
from firebase_admin import credentials

import pyrebase 

# Import the Firebase service
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
email = "admin@gmail.com"
password = "admin123"

print(auth.sign_in_with_email_and_password(email, password))
