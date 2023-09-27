import "../app/globals.css";
import type { AppProps } from "next/app";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NavbarProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </NavbarProvider>
  );
}

export default MyApp;
