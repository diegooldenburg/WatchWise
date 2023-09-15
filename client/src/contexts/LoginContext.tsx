import React, { createContext, ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";

interface LoginContextProps {
  isLoggedIn: boolean;
  logout: () => void;
}

export const LoginContext = createContext<LoginContextProps>({
  isLoggedIn: false,
  logout: () => {},
});

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const { data: session, status } = useSession();

  const logout = () => {
    signOut();
  };

  return (
    <LoginContext.Provider
      value={{ isLoggedIn: status === "authenticated", logout }}
    >
      {children}
    </LoginContext.Provider>
  );
};
