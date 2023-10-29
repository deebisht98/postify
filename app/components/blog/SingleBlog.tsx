"use client";

import { SafeBlog, SafeUser } from "@/app/types/type";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

type BlogProps = {
  blog: SafeBlog;
  currentUser?: SafeUser | null;
};

const SingleBlog: React.FC<BlogProps> = ({ blog, currentUser }: BlogProps) => {
  const router = useRouter();

  // const onLike = () => {
  //   axios
  //     .post(`/api/like/${blog.id}`)
  //     .then(() => {
  //       router.refresh();
  //     })
  //     .catch((error) => {})
  //     .finally(() => {});
  // };

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${blog.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {})
      .finally(() => {});
  };
  return (
    <div className="flex">
      <Image width={300} height={250} src={blog.imageSrc} alt={blog.name} />
      <div className="flex flex-col">
        <h3>{blog.name}</h3>
        <p>{blog.description}</p>
      </div>
      {blog.authorId === currentUser?.id && (
        <div className="flex items-center gap-4 mt-4">
          <RiDeleteBin5Line
            onClick={onDelete}
            className=" cursor-pointer text-[1.5rem]"
          />
          <BsFillPencilFill
            onClick={() => router.push(`/blogs/${blog.id}`)}
            className=" cursor-pointer text-[1.2rem]"
          />
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
