"use client";

import { SafeBlog, TBlogSchema, blogSchema } from "@/app/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "../imageUpload/ImageUpload";
import Input from "../input/Input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const BlogForm = ({ blog }: any) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TBlogSchema>({ resolver: zodResolver(blogSchema) });

  useEffect(() => {
    // reset form with user data
    reset(blog);
  }, [blog]);

  async function onSubmit(data: TBlogSchema) {
    if (blog) {
      save(data, `/api/blogs/${blog.id}`, "PUT");
    } else {
      save(data, "/api/blogs", "POST");
    }
  }

  async function save(data: TBlogSchema, url: string, method: string) {
    if (!data.imageSrc) {
      data.imageSrc =
        "https://res.cloudinary.com/dnyvmgqqt/image/upload/v1700770247/x3pj0aakzn89egbuiqde.png";
    }
    const response = await fetch(url, {
      method: method,
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
      if (errors.title) {
        setError("title", { type: "server", message: errors.title });
      } else if (errors.description) {
        setError("description", {
          type: "server",
          message: errors.description,
        });
      } else if (errors.imageSrc) {
        setError("imageSrc", {
          type: "server",
          message: errors.imageSrc,
        });
      } else {
        alert("Something went wrong!");
      }
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-xl rounded-xl py-8 px-12 flex flex-col items-center border-2 border-gray-200 w-1/3"
    >
      <div className="flex flex-col w-[400px] h-[200px] mb-2">
        <Controller
          name="imageSrc"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <ImageUpload
              id="blog_imageSrc"
              value={value || ""}
              onChange={onChange}
            />
          )}
        />
        <p className="text-red-600 text-xs">{errors.imageSrc?.message}</p>
      </div>
      <Input
        register={register}
        id="blog_title"
        name="title"
        type="text"
        placeholder="Enter your title here"
        label="Title"
        errorMessage={errors.title?.message}
        required={true}
      />
      <Input
        register={register}
        id="blog_description"
        name="description"
        type="text"
        placeholder="Enter your description here"
        label="Description"
        errorMessage={errors.description?.message}
        required={true}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full transform duration-200 py-2 px-4 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 focus:translate-y-1 hover:-translate-y-1"
      >
        Save
      </button>
    </form>
  );
};

export default BlogForm;
