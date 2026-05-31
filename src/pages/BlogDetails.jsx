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
    <section className="min-h-screen w-full flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Blog Cover Image */}
        {blogItem?.image && (
          <div className="w-full h-64 sm:h-96 overflow-hidden rounded-xl shadow-md">
            <img
              src={blogItem.image}
              alt={blogItem?.title || "Blog cover"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        )}

        {/* Blog Header Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {blogItem?.title || "Untitled Post"}
        </h1>

        {/* Author & Date Metadata */}
        <div className="flex items-center gap-4 py-4 border-y border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-gray-400">
          {blogItem?.username && (
            <div>
              By{" "}
              <span className="font-semibold text-slate-800 dark:text-gray-200">
                {blogItem.username}
              </span>
            </div>
          )}
          {blogItem?.createdAt && (
            <>
              <span className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
              <time datetime={blogItem.createdAt}>
                {new Date(blogItem.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>

        {/* Dynamic Blog Body Content */}
        <div className="flex flex-col gap-4 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-gray-300">
          {blogItem?.content?.split("\n").map((line, index) => {
            const trimLine = line.trim();
            if (!trimLine) return <div key={index} className="h-2" />; // Handles empty spaces naturally

            // Parsing Headings
            const isMainHeading =
              trimLine.endsWith("?") ||
              trimLine === "Introduction" ||
              trimLine === "Conclusion" ||
              trimLine.includes("Step", ".") ||
              /^\d+\./.test(trimLine);

            const isSubHeading = trimLine.endsWith(":");

            if (isMainHeading) {
              return (
                <h2
                  key={index}
                  className="text-2xl sm:text-3xl font-bold mt-6 mb-2 text-slate-900 dark:text-white tracking-tight"
                >
                  {trimLine}
                </h2>
              );
            }

            if (isSubHeading) {
              return (
                <h3
                  key={index}
                  className="text-xl font-semibold mt-4 mb-1 text-slate-800 dark:text-gray-100"
                >
                  {trimLine}
                </h3>
              );
            }

            // Standard Paragraph
            return (
              <p key={index} className="text-slate-600 dark:text-gray-300">
                {trimLine}
              </p>
            );
          })}
        </div>

        {/* Tags Footer */}
        {blogItem?.tags && blogItem.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-6 border-t border-slate-100 dark:border-slate-800">
            {blogItem.tags.map((tag, index) => (
              <span
                key={index}
                className="py-1 px-3 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
