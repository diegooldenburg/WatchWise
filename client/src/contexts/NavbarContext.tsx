import React, { createContext, useState, useContext } from "react";

interface NavbarContextProps {
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showSignupModal: boolean;
  setShowSignupModal: (show: boolean) => void;
  showList: boolean;
  setShowList: (show: boolean) => void;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

interface NavbarProviderProps {
  children: React.ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showList, setShowList] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        showLoginModal,
        setShowLoginModal,
        showSignupModal,
        setShowSignupModal,
        showList,
        setShowList,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};
