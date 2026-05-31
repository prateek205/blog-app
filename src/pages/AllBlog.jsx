import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyAuth } from "../context/AuthContext";
import { MyBlogContext } from "../context/AddBlogContext";
import { FaArrowRight } from "react-icons/fa";
import { createSlug } from "../utils/createSlug";

const AllBlog = () => {
  const { id } = useParams();

  const [isExpandedId, setIsExpandedId] = useState(null);

  const { user } = MyAuth();
  const { blogs } = MyBlogContext();

  const filterPost = blogs.filter((post) => post.userId === user?.id);

  const displayBlog = user ? filterPost : blogs;

  const handleToggle = (id) => {
    setIsExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        {displayBlog.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-400 dark:text-gray-500">
              No blogs found yet...
            </h2>
            <p className="text-slate-400 dark:text-gray-500 mt-2">
              Check back later for new updates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {displayBlog.map((item) => {
              const slug =
                item.slug || (createSlug ? createSlug(item.title) : "");

              return (
                <article
                  key={item.id}
                  className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-slate-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Blog Card Image */}
                  {item.image && (
                    <div className="w-full h-48 overflow-hidden bg-slate-200 dark:bg-gray-700">
                      <img
                        src={item.image}
                        alt={item.title || "Blog cover"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Card Content Wrapper */}
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    {/* Header Title */}
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-2 min-h-[3.5rem] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h2>

                    {/* Content Snippet */}
                    <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-3 leading-relaxed flex-1">
                      {item.content ? `${item.content.slice(0, 150)}...` : ""}
                    </p>

                    {/* Metadata Section */}
                    <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-gray-400 pt-3 border-t border-slate-100 dark:border-gray-700">
                      <p>
                        By{" "}
                        <span className="font-semibold text-slate-700 dark:text-gray-300">
                          {item.username || "Anonymous"}
                        </span>
                      </p>
                      {item.createdAt && (
                        <p>
                          {new Date(item.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      )}
                    </div>

                    {/* CTA Read More Link */}
                    <div className="pt-2 flex justify-end">
                      <Link
                        to={`/blogDetails/${item.id}/${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/btn"
                      >
                        Read More
                        <FaArrowRight className="text-xs transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlog;
