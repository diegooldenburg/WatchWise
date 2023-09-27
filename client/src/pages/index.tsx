import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import LandingCarousel from "@/components/LandingCarousel";
import ListComponent from "@/components/ListComponent";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { NavbarProvider, useNavbarContext } from "@/contexts/NavbarContext";

export default function Home({ session }: { session: Session | null }) {
  const [selectedList, setSelectedList] = useState("");
  const {
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal,
  } = useNavbarContext();

  return (
    <SessionProvider session={session}>
      <div className="bg-primary text-secondary h-screen flex flex-col items-center justify-center">
        <Navbar />
        {selectedList ? (
          <ListComponent listName={selectedList} />
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
