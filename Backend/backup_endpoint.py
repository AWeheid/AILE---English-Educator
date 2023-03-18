from flask import Flask , request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/Speaking' , methods = ["POST"])
def getAudioFile():
   with open('voice.wav' , 'wb') as file:
      file.write(request.files.get('file').read())
   print(request.files.get('file'))
   return "OK"


@app.route('/Writing' , methods = ["POST"])
def getUserText():
    print("HI")
    print(request.json['user_input'])
    return "Hello World"

 
if __name__ == '__main__':
   app.run()