"use client";

import StoreProvider from "@/state/redux";

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
};

export default Providers;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
