"use client";

import React from "react";
import Input from "@/app/components/input/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TSignUpSchema, signUpSchema } from "@/app/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const page = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });

  const router = useRouter();

  const handleFormSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      toast(responseData.message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.name) {
        setError("name", { type: "server", message: errors.name });
      } else if (errors.email) {
        setError("email", { type: "server", message: errors.email });
      } else if (errors.password) {
        setError("password", { type: "server", message: errors.password });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
    } else {
      reset();
      router.refresh();
      router.push("/login");
    }
  };

  return (
    <form
      className="shadow-lg rounded-xl py-8 px-12 flex flex-col border-2 border-gray-200 w-1/3"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        register={register}
        id="register_name"
        name="name"
        type="text"
        placeholder="Enter your name"
        label="Name"
        errorMessage={errors.name?.message}
        required={true}
      />

      <Input
        register={register}
        id="register_email"
        name="email"
        type="email"
        placeholder="Enter your email"
        label="Email"
        errorMessage={errors.email?.message}
        required={true}
      />

      <Input
        register={register}
        id="register_password"
        name="password"
        type="password"
        placeholder="Enter your password"
        label="Password"
        errorMessage={errors.password?.message}
        required={true}
      />

      <Input
        register={register}
        id="register_confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        label="Confirm Password"
        errorMessage={errors.confirmPassword?.message}
        required={true}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 transform duration-200 py-2 px-4 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 focus:translate-y-1 hover:-translate-y-1"
      >
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
