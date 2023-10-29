"use client";

import React, { useState } from "react";
import axios from "axios";
import Input from "@/app/components/input/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";

type initialStateProps = {
  name: string;
  email: string;
  password: string;
};

const initialState: initialStateProps = {
  name: "",
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
    axios
      .post("/api/register", user)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {
        console.error("error", err.response.data.message);
        alert(err.response.data.message);
      });
  }

  return (
    <form
      className="bg-sky-100 rounded py-8 px-12 flex flex-col"
      onSubmit={handleFormSubmit}
    >
      <section className="flex flex-col">
        <label className="font-bold">Name</label>
        <Input
          id="register_name"
          name="name"
          type="text"
          value={user.name}
          placeholder="Enter your name"
          onChange={handleInputChange}
        />
      </section>
      <section className="flex flex-col">
        <label className="font-bold">Email</label>
        <Input
          id="register_email"
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
          id="register b_password"
          name="password"
          type="password"
          value={user.password}
          placeholder="Enter your password"
          onChange={handleInputChange}
        />
      </section>
      <button type="submit" className="bg-sky-600 text-white rounded p-2 mt-4">
        Register
      </button>
      <section className="mt-5">
        <p className="text-center">
          Do you already have an account ?{" "}
          <Link href="/login" className="text-green-800 font-medium">
            Sign In
          </Link>
        </p>
      </section>
    </form>
  );
};

export default page;
