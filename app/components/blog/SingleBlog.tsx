"use client";

import { SafeBlog, SafeUser } from "@/app/types/type";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type BlogProps = {
  blog: SafeBlog;
  currentUser?: SafeUser | null;
};

const SingleBlog: React.FC<BlogProps> = ({ blog, currentUser }: BlogProps) => {
  const router = useRouter();

  const onDelete = async () => {
    const response = await fetch(`/api/blogs/${blog.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      toast(responseData.message);
      return;
    }

    toast.success("Updated Successfully");
    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-between w-[100%] lg:w-[32%] h-[245px] shadow-xl border border-black-500 p-4 rounded-xl gap-2">
      <div className="relative w-[50%]">
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          src={blog.imageSrc}
          alt={blog.title}
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col w-[40%] overflow-hidden text-ellipsis">
        <p className="text-lg font-bold">{blog.title}</p>
        <p className="text-sm italic underline underline-offset-2 mb-2">
          {" "}
          - {blog.author.name?.toLowerCase()}
        </p>
        <p className="text-sm">{blog.description}</p>
      </div>
      {blog.authorId === currentUser?.id && (
        <div className="flex items-start gap-4">
          <RiDeleteBin5Line
            onClick={onDelete}
            className="cursor-pointer text-lg"
          />
          <BsFillPencilFill
            onClick={() => router.push(`/blogs/${blog.id}`)}
            className="cursor-pointer text-lg"
          />
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
