"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface ClerkThemeProviderProps {
  children: ReactNode;
}

export function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Previne hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: mounted && theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
