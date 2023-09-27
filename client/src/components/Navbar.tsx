import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useNavbarContext } from "../contexts/NavbarContext";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const isLoggedIn = session ? true : false;

  const {
    showLoginModal,
    setShowLoginModal,
    showSignupModal,
    setShowSignupModal,
    showList,
    setShowList,
  } = useNavbarContext();

  return (
    <nav className="flex justify-between bg-secondary p-6 fixed top-0 w-full">
      <div className="text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">WatchWise</span>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <Link
            href="/my-lists"
            className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0"
          >
            My Lists
          </Link>
        ) : (
          <>
            <button
              onClick={() => setShowSignupModal(true)}
              className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0"
            >
              Sign Up
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm px-4 py-2 leading-none border rounded text-black bg-secondary-button border-transparent hover:bg-secondary-button-hover mt-4 lg:mt-0 ml-2"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
