"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  function handleActiveLink(path: string) {
    return pathname === path ? "text-primary bold" : "text-muted-foreground";
  }

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" width={173} height={39} alt="Logo finance ai" />
        <Link href="/" className={handleActiveLink("/")}>
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={handleActiveLink("/transactions")}
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={handleActiveLink("/subscription")}
        >
          Assinatura
        </Link>
      </div>
      <UserButton showName />
    </nav>
  );
}
