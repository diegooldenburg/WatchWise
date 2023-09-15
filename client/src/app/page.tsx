"use client";

import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import LandingCarousel from "@/components/LandingCarousel";
import ListComponent from "@/components/ListComponent";
import MyListsComponent from "@/components/MyListsComponent";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { LoginContext } from "@/contexts/LoginContext";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  const { isLoggedIn } = useContext(LoginContext);

  return (
    <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
      <Navbar
        openLoginModal={() => setShowLoginModal(true)}
        openSignupModal={() => setShowSignupModal(true)}
        openList={() => setShowList(true)}
      />
      {selectedList ? (
        <ListComponent listName={selectedList} />
      ) : showList ? (
        <MyListsComponent setSelectedList={setSelectedList} />
      ) : (
        <LandingCarousel />
      )}
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
