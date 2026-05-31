import React from "react";
import { BsTrash } from "react-icons/bs";
import { MyBlogContext } from "../context/AddBlogContext";
import { FaBlog, FaHashtag, FaImage } from "react-icons/fa";
import { MdContentPaste } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const Blog = () => {
  const { formData, handleSubmit, handleChange } = MyBlogContext();

  return (
    <section className="min-h-screen px-4 py-12 bg-gray-50 text-slate-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 sm:p-10 shadow-xl transition-all duration-300">
        {/* Form Heading Section */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="memo">
              📝
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Create New Post
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Share your thoughts and stories with the world!
          </p>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Image URL Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <FaImage className="text-blue-500" />
              Blog Image Cover URL
            </label>
            <input
              className="text-base py-2.5 px-4 outline-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              type="url"
              placeholder="https://example.com/image.jpg"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <FaBlog className="text-blue-500" />
              Blog Title
            </label>
            <input
              className="text-base py-2.5 px-4 outline-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
              type="text"
              placeholder="Enter an eye-catching title..."
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tags Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <FaHashtag className="text-blue-500" />
              Tags
            </label>
            <input
              className="text-base py-2.5 px-4 outline-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              type="text"
              placeholder="React, Web Development, CSS (comma separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          {/* Content Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-gray-300">
              <MdContentPaste className="text-blue-500" />
              Content Body
            </label>
            <textarea
              className="text-base py-2.5 px-4 min-h-[250px] outline-none bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-y leading-relaxed"
              placeholder="Write your beautiful story details here..."
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Action Footer Button */}
          <div className="pt-4 flex justify-start">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 transform active:scale-[0.98] cursor-pointer group"
            >
              <FiSend className="text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Blog;
