import React from 'react';
import landingBackground from '../assets/landingBackground.svg';

function HeroLanding() {
  const ss = 'bg-[#707487]';
  return (
    <div
      className="hero min-h-[70vh] bg-[#BCCCCB] "
      style={{
        // backgroundImage: `url(${landingBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-content text-neutral-content max-md:text-center">
        <div className="flex justify-between items-center max-md:flex-col-reverse max-md:gap-7 gap-14">
          <div className="text-left max-md:text-center bg-[#32586D] max-md:p-2 p-10 rounded-lg shadow-lg">
            <h1 className="mb-5 text-5xl max-md:text-3xl font-bold text-secondary-content">
              Discover the Legacy of Excellence
            </h1>
            <p className="mb-5 text-xl text-secondary-content">
              Welcome to Lagacy Books, where tradition meets innovation. Explore
              popular books and take your experience to the next level.
            </p>
          </div>

          <img
            className="h-[50%] w-[50%] max-md:w-full max-md:hidden"
            src={landingBackground}
            alt="Legacy Store"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroLanding;
