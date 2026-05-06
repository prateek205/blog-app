import React from "react";
import { MyAuth } from "../../context/AuthContext";
import { MyBlogContext } from "../../context/AddBlogContext";
import { GoDotFill } from "react-icons/go";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createSlug } from "../../utils/createSlug";

const Profile = () => {
  const { blogs, deleteData, handleEdit } = MyBlogContext();
  const { user, handleLogout } = MyAuth();

  // console.log("user blog:", blog);
  // console.log("User Data:", user);

  const filterPost = blogs.filter((post) => post.userId === user?.id);

  const postCount = filterPost.length;

  return (
    <section className="p-10 h-full w-full flex items-start justify-between gap-5 dark:bg-gray-900 dark:text-white">
      <div className="w-1/3 h-full shadow-[0_0_10px_rgb(50,50,50)] dark:shadow-[0_0_10px_rgb(250,250,250)] rounded-md flex flex-col gap-10 px-5 py-7">
        <h1 className="text-4xl font-bold text-center">My Profile</h1>
        <div className="flex items-start flex-col gap-10 text-left">
          <h1 className="text-lg font-bold">
            Username :{" "}
            <span className="font-normal">{user?.username}</span>{" "}
          </h1>
          <h2 className="text-lg font-bold">
            Email : <span className="font-normal">{user?.email}</span>{" "}
          </h2>
          <p className="text-lg font-bold">
            Password :{" "}
            <span className="font-normal">
              {"*".repeat(user?.password?.length)}
            </span>{" "}
          </p>
          <p className="text-lg font-bold">
            Total Post :{" "}
            <span className="font-normal">{postCount} Post</span>{" "}
          </p>
          <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-400 hover:text-white duration-200 rounded-md py-1 w-1/2 dark:shadow-[0_0_5px_rgb(250,250,250)] dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="px-5 py-6 w-full h-full shadow-[0_0_10px_rgb(50,50,50)] dark:shadow-[0_0_8px_rgb(250,250,250)] flex flex-col items-center justify-start gap-10 rounded-md">
        <h1 className="font-bold text-3xl">Recent Post</h1>
        <div className="grid grid-cols-3 gap-5 rounded-md">
          {filterPost.map((item, index) => {
            const slug = item.slug || createSlug(item.title);
            return (
              <div
                key={index}
                className="shadow-[0_0_10px_rgb(50,50,50)] p-5 flex flex-col gap-2 rounded-md dark:shadow-[0_0_8px_rgb(250,250,250)]"
              >
                <Link to={`/blogDetails/${item.id}/${slug}`}>
                  <h1 className="font-bold">{item.title}</h1>
                </Link>
                <p>{item.content.slice(0, 150)}...</p>
                <div className="flex items-center justify-start flex-row-reverse gap-5">
                  <button
                    onClick={() => deleteData(item.id)}
                    className=" text-black rounded-md py-1 text-xl hover:text-red-700 duration-300 dark:text-white dark:hover:text-red-500"
                  >
                    <BsTrash />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-black rounded-md py-1 text-xl hover:text-orange-500 duration-300 dark:text-white dark:hover:text-red-500"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Profile;
