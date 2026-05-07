import React from "react";
import { useParams } from "react-router-dom";
import { MyBlogContext } from "../context/AddBlogContext";

const BlogDetails = () => {
  const { id, slug } = useParams();
  const { blogs } = MyBlogContext();

  console.log("blogs:", blogs);

  const blogItem = blogs?.find((items) => items.id == id);

  if (!blogItem) {
    return <p>Loading...</p>;
  }

  return (
    <section className="h-screen flex items-start justify-center p-10 dark:bg-gray-900 dark:text-white ">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold">{blogItem.title}</h1>
        <div>
          {blogItem.tags?.map((item, index) => {
            <span key={index}>#{item}</span>;
          })}
        </div>
        <p className="text-sm leading-7">{blogItem.content}</p>
      </div>
    </section>
  );
};

export default BlogDetails;
