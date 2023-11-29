"use client";

import React from "react";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email" | "password";

export type InputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: InputType;
  className?: string;
  errorMessage?: string;
  required: boolean;
  register: any;
};

const Input = (props: InputProps) => {
  const {
    id,
    name,
    label,
    type = "text",
    errorMessage,
    register,
    required = false,
  } = props;

  return (
    <div className="flex flex-col mb-2 relative items-start w-full">
      <label htmlFor={id} className="font-semibold">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <input
        {...register(name)}
        id={id}
        name={name}
        type={type}
        className="p-2 my-2 rounded outline-0 border-2 border-gray-200 w-full"
      />
      <p className="text-red-600 text-xs">{errorMessage}</p>
    </div>
  );
};

export default Input;
