import React from "react";
import { BsTrash } from "react-icons/bs";
import { MyBlogContext } from "../context/AddBlogContext";
import { FaBlog, FaHashtag } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const Blog = () => {
  const { formData, handleSubmit, handleChange } = MyBlogContext();

  return (
    <section className="h-full px-5 py-8 bg-white text-black dark:bg-gray-900 dark:text-white duration-300">
      <div className=" rounded-xl m-auto shadow-[0_0_5px_rgb(50,50,50)] flex flex-col gap-5 w-1/2 h-6/5 py-5 px-8 dark:shadow-[0_0_10px_rgb(250,250,250)]">
        <div className="flex items-start gap-5 flex-col  text-4xl">
          <div className="flex">
            📝
            <h1 className="text-4xl">Create New Post</h1>
          </div>
          <p className="text-lg">Share your thought with world!!</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="text-xl flex items-center gap-2">
            <FaBlog />
            Blog Title
          </label>
          <input
            className="text-lg py-2 px-2 outline-none bg-transparent border-2 border-gray-300 dark:border-2 dark:border-gray-600 rounded-md"
            type="text"
            placeholder="Enter your blog title here..."
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label className="text-xl flex items-center gap-2">
            <FaHashtag /> Tags
          </label>
          <input
            className="text-lg py-2 px-2 outline-none bg-transparent border-2 border-gray-300 dark:border-2 dark:border-gray-600 rounded-md"
            type="text"
            placeholder="React, Web Development, HTML, CSS"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
          <label className="text-xl flex items-center gap-2">
            <MdContentPaste /> Content
          </label>
          <textarea
            className="text-lg py-2 px-3 outline-none bg-transparent border-2 border-gray-300 dark:border-2 dark:border-gray-600 rounded-md"
            cols="30"
            rows="15"
            placeholder="Enter your content here..."
            name="content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
          <div className="flex gap-10">
            <button className="flex items-center gap-4 bg-gradient-to-r from-blue-500 to-blue-300 hover:text-black duration-300 cursor-pointer text-lg px-3 py-2 w-1/4 rounded-md hover:translate-y-1">
              <FiSend />
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Blog;
