"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

interface ClerkThemeProviderProps {
  children: ReactNode;
}

export function ClerkThemeProvider({ children }: ClerkThemeProviderProps) {
  const { theme, resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: (theme === "dark" || resolvedTheme === "dark") ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
