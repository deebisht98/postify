import React from "react";
import getCurrentUser from "./actions/getCurrentUser";
import SingleBlog from "./components/blog/SingleBlog";
import getBlogs from "./actions/getBlogs";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <div className="flex">
      {blogs.map((blog) => (
        <SingleBlog key={blog.id} blog={blog} currentUser={currentUser} />
      ))}
    </div>
  );
}
