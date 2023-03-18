import time
from flask import Flask , request
from flask_cors import CORS
import requests 
import json



app = Flask(__name__)
CORS(app)



def inquire_chatgpt(message, history_file = 'base.json'): 
    url = "https://experimental.willow.vectara.io/v1/chat/completions"
    
    with open(history_file) as json_file:
        history = json.load(json_file)
    
    print(type(history))

    history.append({
            "role": "user",
            "content": f"{message}"
            })
    
    
    payload = json.dumps({
    "model": "gpt-3.5-turbo",
    "messages": history,
    "temperature" : 0.4
    })
    headers = {
    'Content-Type': 'application/json',

    }
    if history_file != 'base.json':
        with open(history_file,"w") as f: 
            json.dump(history, f)


    response = requests.request("POST", url, headers=headers, data=payload)
    ## we will update the history by adding assistant's response 
    print(str(response.json()))
    return(response.json()['choices'][0]['message']['content'])


def voice_chat(user_voice):
   url = "https://experimental.willow.vectara.io/v1/audio/transcriptions"

   payload={'model': 'whisper-1' , 'language' : 'en'}
   with open(user_voice,'rb') as f :
    bytesOfAudio = f.read()
    f.close()
   files=[
   ('file',('file.wav',bytesOfAudio,'application/octet-stream'))
   ]
   headers = {

   }

   response = requests.request("POST", url, headers=headers, data=payload, files=files)

   print(str(response.json()))
   return(response.json()["text"])

questions_log= []


@app.route('/Speaking' , methods = ["POST"])
def getAudioFile():
   print(request.files , len(request.files))
   if(len(request.files)):
      with open('voice4.wav' , 'wb') as file:
         file.write(request.files.get('file').read())
      stt_output= voice_chat('voice4.wav')
      
   else:
      stt_output = "Good, now give me the result"

   gpt_output= inquire_chatgpt(stt_output, history_file= "speaking_history.json")
   
   
   return gpt_output

@app.route('/Writing' , methods = ["POST"])
def getUserText():
   text_input = request.json['user_input']
   gpt_output = inquire_chatgpt( text_input )
   if("As an AI language model" in gpt_output):
      gpt_output = gpt_output[gpt_output.find("However")+8 : ]
   return gpt_output

 
if __name__ == '__main__':
   app.run()