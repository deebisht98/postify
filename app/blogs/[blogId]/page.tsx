import getBlogsById from "@/app/actions/getBlogsById";
import BlogForm from "@/app/components/blog/BlogForm";

type blogParams = {
  blogId: string;
};

export default async function page({ params }: { params: blogParams }) {
  const blog = await getBlogsById(params);

  return <BlogForm blog={blog} />;
}
