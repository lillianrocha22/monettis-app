"use client";

import { Home, ArrowLeftRight, Plus, LayoutGrid, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/_lib/utils";
import AddTransactionButton from "./add-transaction-button";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isAction?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/transactions", icon: ArrowLeftRight, label: "Transacoes" },
  { href: "#add", icon: Plus, label: "Adicionar", isAction: true },
  { href: "/subscription", icon: LayoutGrid, label: "Planos" },
  { href: "#more", icon: MoreHorizontal, label: "Mais" },
];

interface BottomNavProps {
  userCanAddTransaction?: boolean;
}

export function BottomNav({ userCanAddTransaction }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <div key={item.label} className="flex flex-col items-center">
                <AddTransactionButton
                  userCanAddTransaction={userCanAddTransaction}
                  variant="mobile"
                />
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
