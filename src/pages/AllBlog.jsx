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
    <section className="h-screen">
      <div className="h-full flex items-center justify-center">
        {displayBlog.length === 0 ? (
          <h2 className="text-2xl font-bold">No blog yet...</h2>
        ) : (
          <div className="grid grid-cols-3 gap-20 p-5">
            {displayBlog.map((item, index) => {
              const isExpanded = isExpandedId === item.id;
              const slug = item.slug || createSlug(item.title);
              return (
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlog;
