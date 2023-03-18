import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../partials/Header';;

function sendData(data) {
  const XHR = new XMLHttpRequest();
  XHR.addEventListener('error', (event) => {
    alert('Oops! Something went wrong.');
  });
  XHR.onload = function () {
    document.getElementById('sec-2').className = "relative"
    document.getElementById('sec-1').style.display = "none"
    console.log("HI")
    document.getElementById('result').innerText = "Here is your result \n" + XHR.responseText
  }
  // Set up our request
  XHR.open('POST', 'http://localhost:5000/Writing');
  XHR.setRequestHeader('Content-Type', 'application/json');
  // Send our FormData object; HTTP headers are set automatically
  const formData = new FormData();
  var user_input = JSON.stringify({ "user_input": data })
  XHR.send(user_input);
}

function evaluateMytext(){
  const writing = document.getElementById("write_gpt_response").value
  sendData(writing)
}
function Writing() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header g = "<= Home"/>

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        {/* <PageIllustration /> */}

        <section id='sec-2' className="relative hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <p id='result' className='bg-gray-600'>
                  <br /><br />
                </p>
                <div data-aos="fade-up" data-aos-delay="600">
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4 mt-5" href="/Writing">
                  Send another paragraph
                </a>
              </div>
              </div>
            </div>
          </div>
        </section>
        <section id='sec-1' className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Write whatever you write</h1>
                <h1 className="h1">You'll be improved</h1>
              </div>

              <div className='max-w-sm mx-auto'>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <textarea id="write_gpt_response" type="textarea" className="form-input w-full text-gray-300 h-auto" placeholder='Write your sentences ...'/>
                      <button id='start_stop_recording'className="btn text-white bg-gray-600 hover:bg-green-700 w-full"
                      onClick={evaluateMytext}>Evaluate</button>
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

export default Writing;