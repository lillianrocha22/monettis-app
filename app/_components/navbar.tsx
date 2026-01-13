"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/transactions", label: "Transações" },
  { href: "/subscription", label: "Assinatura" },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-between border-b border-solid px-4 py-4 md:px-8">
      {/* MOBILE - HAMBURGER */}
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <SheetHeader>
              <SheetTitle>
                <Image
                  src="/logo.svg"
                  width={140}
                  height={32}
                  alt="Monettis"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 text-base transition-colors ${
                    pathname === link.href
                      ? "bg-primary/10 font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 border-t pt-4">
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
        <Image
          src="/logo.svg"
          width={120}
          height={28}
          alt="Monettis"
          className="lg:hidden"
        />
      </div>

      {/* DESKTOP - ESQUERDA */}
      <div className="hidden items-center gap-10 lg:flex">
        <Image src="/logo.svg" width={173} height={39} alt="Monettis" />
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        {/* Esconde o nome no mobile via CSS */}
        <div className="[&_.cl-userButtonOuterIdentifier]:hidden [&_.cl-userButtonOuterIdentifier]:lg:inline">
          <UserButton showName />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
