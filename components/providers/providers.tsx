"use client";

import { SessionProvider } from "next-auth/react";
import ModalProvider from "@/providers/modal-provider";
import ThemeProvider from "@/providers/theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <ModalProvider />
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
