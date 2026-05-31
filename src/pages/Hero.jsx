import React, { useState } from "react";
import { MyBlogContext } from "../context/AddBlogContext";
import { MyAuth } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import { createSlug } from "../utils/createSlug";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
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
    <section className="relative z-10 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Hero Banner Container */}
        <div className="w-full overflow-hidden rounded-xl shadow-lg">
          <img
            src="./heroBanner.jpg"
            alt="Hero Banner"
            className="h-64 sm:h-80 md:h-96 w-full object-cover object-center"
          />
        </div>

        {/* Header & View All Button Action Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Featured Blog
          </h1>
          <Link to="/allBlog" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
              <span>View All Blogs</span>
              <FaArrowRight className="text-sm" />
            </button>
          </Link>
        </div>

        {/* Blog Grid Section */}
        <div className="w-full">
          {displayBlog?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                No blogs available yet...
              </h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayBlog.slice(0, 3).map((item) => {
                const slug = item.slug || createSlug(item.title);

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Blog Image */}
                    <div className="h-48 w-full overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-col flex-grow p-6 gap-4">
                      <h2 className="text-xl font-bold line-clamp-2 group-hover:text-blue-500 transition-colors duration-200">
                        {item.title}
                      </h2>

                      {/* Push meta details to the absolute bottom of the card */}
                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            By{" "}
                            <span className="font-semibold text-gray-700 dark:text-gray-300 truncate inline-block max-w-[120px] align-bottom">
                              {item.username}
                            </span>
                          </span>
                          <span className="text-[11px] text-gray-400 mt-0.5">
                            {item.createdAt}
                          </span>
                        </div>

                        <Link
                          to={`/blogDetails/${item.id}/${slug}`}
                          className="shrink-0"
                        >
                          <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 font-semibold text-sm flex items-center gap-1 group/btn transition-colors">
                            <span>Read More</span>
                            <FaArrowRight className="text-xs transform group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
