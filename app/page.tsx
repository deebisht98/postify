import React from "react";
import getCurrentUser from "./actions/getCurrentUser";
import SingleBlog from "./components/blog/SingleBlog";
import getBlogs from "./actions/getBlogs";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <div className="flex gap-4 h-full flex-wrap md:p-10 px-8">
      {blogs.map((blog) => (
        <SingleBlog key={blog.id} blog={blog} currentUser={currentUser} />
      ))}
    </div>
  );
}
