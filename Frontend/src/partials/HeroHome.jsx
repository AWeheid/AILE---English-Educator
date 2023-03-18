import React, { useState } from 'react';
import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image-01.jpg';

function HeroHome() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Illustration behind hero content */}
        
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h1 mb-4" data-aos="fade-up">
              " A I L E "
            </h1>
            <h2 className="h1 mb-4" data-aos="fade-up">
              Evaluate yourself in English! 
            </h2>
            <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
              Here you can evaluate yourself in English, you can Speak and Write then get our result within a second!! 
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div data-aos="fade-up" data-aos-delay="400">
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full mb-4 sm:w-auto sm:mb-0"href = '/Speaking'>
                  Speaking
                </a>
              </div>
              <div data-aos="fade-up" data-aos-delay="600">
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="/Writing">
                  Writing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
