"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import LandingCarousel from "@/components/LandingCarousel";
import ListComponent from "@/components/ListComponent";
import MyLists from "@/components/MyLists";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export default function Home({ session }: { session: Session | null }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showList, setShowList] = useState(false);
  const [selectedList, setSelectedList] = useState("");

  return (
    <SessionProvider session={session}>
      <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
        <Navbar
          openLoginModal={() => setShowLoginModal(true)}
          openSignupModal={() => setShowSignupModal(true)}
          openList={() => setShowList(true)}
        />
        {selectedList ? (
          <ListComponent listName={selectedList} />
        ) : showList ? (
          <MyLists setSelectedList={setSelectedList} />
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
    </SessionProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
