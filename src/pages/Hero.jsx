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
    <section className="relative z-10 h-full flex items-start justify-center bg-white dark:bg-gray-900 text-black dark:text-white duration-300">
      <div className="flex flex-col gap-10">
        <div>
          <img src="./heroBanner.jpg" alt="" className="object-cover" />
        </div>

        <h1 className="text-4xl text-center">Featured Blog</h1>

        <Link to="/allBlog" className="px-5 flex justify-start">
          <button className="w-54 mr-0 px-5 py-2 rounded-md hover:bg-blue-400 hover:text-white flex items-center gap-2 bg-blue-500">
            <h1>View All Blogs</h1>
            <FaArrowRight />
          </button>
        </Link>
        <div className="h-full flex items-center justify-center py-5">
          {displayBlog.length === 0 ? (
            <h2 className="text-2xl font-bold">No blog yet...</h2>
          ) : (
            <div className="grid grid-cols-3 gap-20 p-5">
              {displayBlog.slice(0, 3).map((item, index) => {
                const isExpanded = isExpandedId === item.id;
                const slug = item.slug || createSlug(item.title);
                return (
                  <>
                    <div
                      key={item.id}
                      className="w-full h-full flex flex-col gap-5 px-5 py-6 rounded-md shadow-[0_0_10px_rgb(50,50,50)] dark:shadow-[0_0_10px_rgb(250,250,250)]"
                    >
                      <h2 className="text-xl font-bold">{item.title}</h2>
                      <p className="text-sm">{item.content.slice(0, 180)}...</p>
                      <Link to={`/blogDetails/${item.id}/${slug}`}>
                        <button className="text-blue-500 hover:scale-105 flex items-center justify-center gap-2 text-left hover:underline underline-offset-2 duration-300">
                          <p>Read More </p>
                          <FaArrowRight />
                        </button>
                      </Link>
                    </div>
                  </>
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
