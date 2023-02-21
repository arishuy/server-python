# Import the Firebase service
import firebase_admin
from firebase_admin import credentials, db

# Other Modules
import json

# Load appsettings JSON file
with open('appsettings.json', 'r') as json_file:
    appsettings = json.load(json_file)

# Firebase-APIKey File
API_KEY_PATH = "firebase-api-key.json" #Add your API file path

# Initialize the default firebase app
certificate = credentials.Certificate(API_KEY_PATH) 
firebaseApp = firebase_admin.initialize_app(certificate, {'databaseURL': appsettings['DatabaseURL']})

# Firebase Database Reference
class Test():
    def __init__(self):
        self.ref = db.reference('Test')

    def get(self):
        return self.ref.get()

    def set(self, value):
        self.ref.set(value)

    def push(self, value):
        self.ref.push(value)

    def update(self, value):
        self.ref.update(value)

    def delete(self):
        self.ref.delete()
    def login(self):
        return "Login Successful"