import React from "react";
import { BsTrash } from "react-icons/bs";
import { MyBlogContext } from "../context/AddBlogContext";

const Blog = () => {
  const { formData, handleSubmit, handleChange } = MyBlogContext();

  return (
    <section className="h-screen px-5 py-8 bg-white text-black dark:bg-gray-900 dark:text-white duration-300">
      <div className=" rounded-md shadow-[0_0_5px_rgb(50,50,50)] w-full h-6/5 py-5 px-8 dark:shadow-[0_0_10px_rgb(250,250,250)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="shadow-[0_0_5px_rgb(50,50,50)] text-xl py-3 px-2 outline-none bg-transparent dark:shadow-[0_0_10px_rgb(250,250,250)] rounded-md"
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            className="shadow-[0_0_5px_rgb(50,50,50)] text-xl py-2 px-3 outline-none bg-transparent dark:shadow-[0_0_10px_rgb(250,250,250)] rounded-md"
            cols="30"
            rows="15"
            placeholder="Type here...."
            name="content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
          <div className="flex gap-10">
            <button className="bg-gray-500 hover:bg-gray-400 hover:text-white duration-300 cursor-pointer text-xl py-2 w-1/6 rounded-md dark:shadow-[0_0_10px_rgb(250,250,250)] dark:bg-gray-900 dark:hover:bg-gray-800">
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Blog;
