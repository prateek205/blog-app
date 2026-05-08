import React from "react";
import { MyBlogContext } from "../context/AddBlogContext";
import { Link } from "react-router-dom";

const EditPage = () => {
  const { isEditOpen, closeModal, formData, handleChange, handleSubmit } =
    MyBlogContext();

  if (!isEditOpen) return null;

  return (
    <section className="w-full h-full fixed inset-0 bg-black/80 flex flex-col gap-5 items-center justify-center z-50">
      <div>
        <h1 className="uppercase text-xl font-bold text-white dark:text-white">
          Edit Blog
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 text-black"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="py-2 px-3 outline-none rounded-md"
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="py-2 px-3 outline-none rounded-md"
          />
          <textarea
            cols="80"
            rows="20"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="py-1 px-2 rounded-md outline-none"
          />
          <div className="flex gap-4">
            <button className="hover:text-orange-500 duration-300 bg-gray-300 py-1 px-2 rounded-md">
              Update
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="hover:text-red-600 py-1 px-2 text-white dark:hover:text-red-500 dark:text-white duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPage;
