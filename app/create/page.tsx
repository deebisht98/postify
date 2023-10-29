"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageUpload from "../components/imageUpload/ImageUpload";
import Input from "../components/input/Input";
import axios from "axios";
import { newBlog } from "../types/type";

type imageUploadProps = {
  name: string;
  value: string;
};

const initialState: newBlog = {
  name: "",
  imageSrc: "",
  description: "",
};

const page = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState<newBlog>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const setCustomValue = ({ name, value }: imageUploadProps) => {
    setBlogData({ ...blogData, [name]: value });
  };

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post("/api/blogs", blogData)
      .then(() => {
        router.push("/");
      })
      .catch((err: any) => {
        console.error("error", err.response.data.message);
        alert(err.response.data.message);
      });
    router.refresh();
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-y-4 p-8 bg-sky-100 rounded py-8 px-12"
    >
      <div className="flex flex-col w-[350px]">
        <ImageUpload
          value={blogData.imageSrc}
          onChange={(value) =>
            setCustomValue({ name: "imageSrc", value: value })
          }
        />
      </div>
      <div className="flex flex-col">
        <Input
          type="text"
          placeholder="Enter your blog header"
          name="name"
          id="blog_name"
          value={blogData.name}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Enter your blog description"
          name="description"
          id="blog_description"
          value={blogData.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-sky-600 text-white rounded p-2 mt-4"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default page;
