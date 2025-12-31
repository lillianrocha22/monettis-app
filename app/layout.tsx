import type { Metadata } from "next";
import {Mulish} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./_components/theme-provider";
import { ClerkThemeProvider } from "./_components/clerk-theme-provider";

const mulish = Mulish ({
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: {
    default: "Monettis - Gestão Inteligente de Finanças Pessoais",
    template: "%s | Monettis",
  },
  description:
    "Gerencie suas finanças pessoais de forma inteligente com Monettis. Controle receitas, despesas e investimentos, visualize relatórios detalhados e receba insights financeiros personalizados com IA.",
  keywords: [
    "finanças pessoais",
    "controle financeiro",
    "gestão de dinheiro",
    "orçamento pessoal",
    "investimentos",
    "despesas",
    "receitas",
    "relatório financeiro",
    "IA financeira",
    "planejamento financeiro",
  ],
  authors: [{ name: "Monettis" }],
  creator: "Monettis",
  publisher: "Monettis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Monettis - Gestão Inteligente de Finanças Pessoais",
    description:
      "Controle suas finanças pessoais com inteligência. Acompanhe receitas, despesas e investimentos em um só lugar.",
    siteName: "Monettis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monettis - Gestão Inteligente de Finanças Pessoais",
    description:
      "Controle suas finanças pessoais com inteligência. Acompanhe receitas, despesas e investimentos em um só lugar.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${mulish.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="monettis-theme"
          disableTransitionOnChange
        >
          <ClerkThemeProvider>
            {children}
            <Toaster />
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
