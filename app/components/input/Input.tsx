"use client";

import React from "react";

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: InputProps) => {
  return (
    <input
      className="p-2 my-2 rounded outline-0 border-1 border-gray-400 w-[350px]"
      {...props}
    />
  );
};

export default Input;
