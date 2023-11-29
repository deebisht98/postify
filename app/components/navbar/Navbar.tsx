"use client";

import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { SafeUser } from "@/app/types/type";
import { LiaUserCircleSolid } from "react-icons/lia";

type UserMenuProps = {
  currentUser: SafeUser | null;
};

const Navbar = ({ currentUser }: UserMenuProps) => {
  return (
    <nav className="bg-grey-200 flex justify-between px-4 py-6 shadow-xl h-[10vh]">
      <div className="flex items-center gap-2 text-lg cursor-pointer focus:translate-y-1 hover:-translate-y-1 transition-all ease-in">
        <LiaUserCircleSolid size={32} />
        <p>{currentUser?.name}</p>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Link
          href="/"
          className="focus:translate-y-1 hover:-translate-y-1 transition-all ease-in"
        >
          Home
        </Link>
        <Link
          href={currentUser ? "/create" : "/login"}
          className="focus:translate-y-1 hover:-translate-y-1 transition-all ease-in"
        >
          {currentUser ? "Create" : "Login"}
        </Link>
        {currentUser ? (
          <button
            onClick={() => signOut()}
            className="focus:translate-y-1 hover:-translate-y-1 transition-all ease-in"
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/register"
            className="focus:translate-y-1 hover:-translate-y-1 transition-all ease-in"
          >
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
