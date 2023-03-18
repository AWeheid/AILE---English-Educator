import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
var GG = " ... "
var voice_recorded
var audioFile
function sendData(data) {
  const XHR = new XMLHttpRequest();

  XHR.onload = function () {
    document.getElementById("speak_gpt_response").value = XHR.responseText
  }
  // Define what happens in case of an error
  XHR.addEventListener('error', (event) => {
    alert('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', 'http://localhost:5000/Speaking');

  // Send our FormData object; HTTP headers are set automatically
  XHR.send(data);
}
function Speaking() {
  const recorderControls = useAudioRecorder();
  async function startRecord(){
    const recordButton = document.getElementById('start_stop_recording')
    console.log(recorderControls.isRecording)
    if(!recorderControls.isRecording){
      console.log("Starting")
      recorderControls.startRecording()
      recordButton.innerHTML = 'You\'r speaking ...'
    }
    else{
      recorderControls.stopRecording()
      console.log("Start sending")
      console.log("Recorded Blob:" , recorderControls.recordingBlob)
      recordButton.innerHTML = 'Speak again'
    }
  }
   function send(){
    audioFile = new File([recorderControls.recordingBlob], 'voice.wav', { type: 'audio/wav' });
    const formData = new FormData();
    console.log(audioFile)
    formData.append('file', audioFile);
    sendData(formData)
  }
  function getResult(){
    sendData("give me the result")
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header g='Home'/>
      <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

      {/*  Page content */}
      <main className="grow">

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="mx-auto text-center pb-12 md:pb-10">
                <h1 className="h1">Go Ahead & Speak</h1>
              </div>
              <div className="max-w-sm mx-auto">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <textarea id="speak_gpt_response" type="text" className="form-input w-full text-gray-300" disabled value={GG}/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button id='start_stop_recording'className="btn text-white bg-gray-600 hover:bg-red-700 w-full"
                      onClick={startRecord}>Speak</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-green-600 hover:bg-green-700 w-full"
                      onClick={getResult}>Result</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6 hidden">
                    <div className="w-full px-3">
                    <AudioRecorder 
                    onRecordingComplete={() => send()}
                    recorderControls={recorderControls}/>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

      </main>


    </div>
  );
}

export default Speaking;