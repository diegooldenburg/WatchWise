import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar />
      <h1 className="text-secondary">Welcome to WatchWise!</h1>
      <p className="text-secondary">
        Plan your next month's movies and TV shows with us and we'll tell you
        which streaming services you'll need.
      </p>
      <button className="bg-primary-button text-black px-4 py-2 rounded-full mt-4">
        Sign Up
      </button>
      <button className="bg-secondary-button text-black px-4 py-2 rounded-full mt-2">
        Log In
      </button>
      <div className="about-section mt-10 px-5 text-center">
        <h2 className="text-secondary">About WatchWise</h2>
        <p className="text-secondary">
          WatchWise is a platform that helps you plan your movie and TV show
          watching schedule. Simply tell us what you plan on watching next
          month, and we'll tell you which streaming services you'll need to
          subscribe to. We make use of the IMDB API and the JustWatch API to
          provide accurate and up-to-date information.
        </p>
      </div>
    </div>
  );
}
