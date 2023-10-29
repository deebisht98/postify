"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { SafeUser } from "@/app/types/type";

type UserMenuProps = {
  currentUser: SafeUser | null;
};

const Navbar = ({ currentUser }: UserMenuProps) => {
  return (
    <nav className="bg-grey-200 flex justify-between px-4 py-6 shadow-xl">
      <p>{currentUser?.name}</p>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href={currentUser ? "/create" : "/login"}>Create</Link>
        {currentUser ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <Link href="/register">Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
