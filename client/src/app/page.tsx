"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import LandingCarousel from "@/components/LandingCarousel";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { LoginContext } from "@/contexts/LoginContext";
import ListComponent from "@/components/ListComponent";
import MyListsComponent from "@/components/MyListsComponent";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const [showList, setShowList] = useState(false);

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <LoginContext.Provider value={{ isLoggedIn, setLogin }}>
        <Navbar
          openLoginModal={() => setShowLoginModal(true)}
          openSignupModal={() => setShowSignupModal(true)}
          openList={() => setShowList(true)}
        />
        {showList ? <MyListsComponent /> : <LandingCarousel />}
        <LoginModal
          isOpen={showLoginModal}
          closeModal={() => setShowLoginModal(false)}
        />
        <SignupModal
          isOpen={showSignupModal}
          closeModal={() => setShowSignupModal(false)}
        />
      </LoginContext.Provider>
    </div>
  );
}
