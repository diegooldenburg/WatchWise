import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  openLoginModal: () => void;
  openSignupModal: () => void;
  openList: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  openLoginModal,
  openSignupModal,
  openList,
}) => {
  const { data: session } = useSession();
  const isLoggedIn = session ? true : false;

  return (
    <nav className="flex justify-between bg-secondary p-6 fixed top-0 w-full">
      <div className="text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">WatchWise</span>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <>
            <button
              className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0"
              onClick={openList}
            >
              My Lists
            </button>
            <button className="text-sm px-4 py-2 leading-none border rounded text-black bg-secondary-button border-transparent hover:bg-secondary-button-hover mt-4 lg:mt-0 ml-2">
              TV Shows
            </button>
            <button className="text-sm px-4 py-2 leading-none border rounded text-black bg-secondary-button border-transparent hover:bg-secondary-button-hover mt-4 lg:mt-0 ml-2">
              Movies
            </button>
            <button
              className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0 ml-2"
              onClick={() => signOut()}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openSignupModal}
              className="text-sm px-4 py-2 leading-none border rounded text-black bg-primary-button border-transparent hover:bg-primary-button-hover mt-4 lg:mt-0"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              className="text-sm px-4 py-2 leading-none border rounded text-black bg-secondary-button border-transparent hover:bg-secondary-button-hover   mt-4 lg:mt-0 ml-2"
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
