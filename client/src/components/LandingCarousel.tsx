"use client";

import { useState } from "react";

const LandingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "WatchWise is a platform that helps you plan your movie and TV show watching schedule.",
    "Simply tell us what you plan on watching next month, and we'll tell you which streaming services you'll need to subscribe to.",
    "We make use of the IMDB API and the JustWatch API to provide accurate and up-to-date information.",
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-container relative bg-secondary p-6 rounded-lg w-3/4 h-3/4 mt-20 border-2 border-custom-color flex items-center justify-center">
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 border-custom-color px-4 py-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <p className="text-center transition-all transform ease-in-out duration-500 text-lg">
        {slides[currentSlide]}
      </p>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-custom-color px-4 py-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default LandingCarousel;
