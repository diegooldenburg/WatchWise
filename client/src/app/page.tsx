"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import LandingCarousel from "@/components/LandingCarousel";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar
        openLoginModal={() => setShowLoginModal(true)}
        openSignupModal={() => setShowSignupModal(true)}
      />
      <LandingCarousel />
      <LoginModal
        isOpen={showLoginModal}
        closeModal={() => setShowLoginModal(false)}
      />
      <SignupModal
        isOpen={showSignupModal}
        closeModal={() => setShowSignupModal(false)}
      />
    </div>
  );
}
