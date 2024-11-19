"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import logo from "@/assets/logo.svg";

export function Navbar() {
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={30} height={30} />
          <span className="text-xl font-semibold tracking-tight">Pilot</span>
        </Link>

        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: 35,
                height: 35,
              },
            },
          }}
        />
      </div>
    </header>
  );
}
