import React from 'react';
import landingBackground from '../assets/landingBackground.svg';

function HeroLanding() {
  return (
    <div
      className="hero min-h-[70vh]"
      //   style={{
      //     backgroundImage: `url(${landingBackground})`,
      //   }}
      style={{
        backgroundColor: '#707487',
      }}
    >
      <div className=""></div>
      <div className="hero-content text-neutral-content max-md:text-center">
        <div className="flex justify-between items-center max-md:flex-col-reverse max-md:gap-7">
          <div className="">
            <h1 className="mb-5 text-5xl font-bold">
              Go beyond your imagination
            </h1>

            {/* 
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p> */}
            <button className="btn btn-primary">Get Started</button>
          </div>
          <img className="h-[50%] w-[50%]" src={landingBackground} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HeroLanding;
