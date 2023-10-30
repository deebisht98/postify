"use client";

import Input from "@/app/components/input/Input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

type initialStateProps = {
  email: string;
  password: string;
};

const initialState: initialStateProps = {
  email: "",
  password: "",
};

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState<initialStateProps>(initialState);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn("credentials", {
      ...user,
      redirect: false,
    }).then((cb) => {
      if (cb?.ok) {
        router.refresh();
        router.push("/");
      }
      if (cb?.error) {
        alert("Wrong Credentials...");
      }
    });
  }

  return (
    <form
      className="bg-sky-100 rounded py-8 px-12 flex flex-col"
      onSubmit={handleFormSubmit}
    >
      <section className="flex flex-col">
        <label className="font-bold">Email</label>
        <Input
          id="login_email"
          name="email"
          type="email"
          value={user.email}
          placeholder="Enter your email"
          onChange={handleInputChange}
        />
      </section>
      <section className="flex flex-col">
        <label className="font-bold">Password</label>
        <Input
          id="login_password"
          name="password"
          type="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
      </section>
      <button type="submit" className="bg-sky-600 text-white rounded p-2 mt-4">
        Sign In
      </button>
      <section className="mt-5">
        <p className="text-center">
          Haven't you got an account yet ?{" "}
          <Link href="/register" className="text-green-800 font-medium">
            Register
          </Link>
        </p>
      </section>
    </form>
  );
};

export default page;
