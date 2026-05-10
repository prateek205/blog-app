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
    <section className="h-full flex items-start justify-center p-10 dark:bg-gray-900 dark:text-white ">
      <div className="flex flex-col gap-5">
        <img
          src={blogItem.image}
          alt=""
          className="w-full h-96 object-cover rounded-md"
        />
        <h1 className="text-4xl font-bold">{blogItem?.title}</h1>
        <div className="text-sm leading-7 whitespace-pre-line">
          {blogItem.content.split("\n").map((line, index) => {
            const trimLine = line.trim();
            const isMainHeading =
              trimLine.endsWith("?") ||
              trimLine === "Introduction" ||
              trimLine === "Conclusion" ||
              trimLine.includes("Step", ".") ||
              /^\d+\./.test(trimLine);

            const isSubHeading = trimLine.endsWith(":");

            return isMainHeading ? (
              <h2 key={index} className="text-2xl font-bold">
                {trimLine}
              </h2>
            ) : isSubHeading ? (
              <h3 key={index} className="font-bold">
                {trimLine}
              </h3>
            ) : (
              <p key={index} className="ml-5 text-sm leading-10">
                {trimLine}
              </p>
            );
          })}
        </div>
        <div className="flex gap-2 text-sm flex-wrap justify-start">
          {blogItem.tags.map((item, index) => {
            return (
              <div
                key={index}
                className="py-1 px-3 rounded-md bg-blue-300 text-blue-500"
              >
                #{item}{" "}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <h2 className="text-sm font-bold">
            Author:{" "}
            <span className="font-normal">{blogItem.username}</span>{" "}
          </h2>
          <p className="text-sm font-bold">
            CreatedAt:{" "}
            <span className="font-normal">{blogItem.createdAt}</span>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
