"use client";

import Input from "@/app/components/input/Input";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignInSchema, signInSchema } from "@/app/types/authTypes";

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const router = useRouter();

  function handleFormSubmit(data: TSignInSchema) {
    signIn("credentials", {
      ...data,
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
      className="shadow-xl rounded-xl py-8 px-12 flex flex-col border-2 border-gray-200 w-1/3"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        register={register}
        id="login_email"
        name="email"
        type="email"
        placeholder="Enter your email"
        label="Email"
        errorMessage={errors.email?.message}
        required={true}
      />
      <Input
        register={register}
        id="login_password"
        name="password"
        type="password"
        placeholder="Enter your password"
        label="Password"
        errorMessage={errors.password?.message}
        required={true}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 transform duration-200 py-2 px-4 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 focus:translate-y-1 hover:-translate-y-1"
      >
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
