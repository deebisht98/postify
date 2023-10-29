import getBlogsById from "@/app/actions/getBlogsById";
import BlogId from "@/app/components/blog/BlogId";

type blogParams = {
  blogId: string;
};

export default async function page({ params }: { params: blogParams }) {
  const blog = await getBlogsById(params);

  const date = blog?.createdAt;

  return (
    <div className="">
      <div>
        <BlogId
          name={blog?.name}
          description={blog?.description}
          blogId={blog?.id}
          imageSrc={blog?.imageSrc}
        />
      </div>
    </div>
  );
}
