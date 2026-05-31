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
    <section className="min-h-screen bg-slate-50 text-slate-900 dark:bg-gray-900 dark:text-gray-100 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-between">
        {/* Profile Sidebar */}
        <aside className="w-full lg:w-80 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700/60 rounded-2xl p-6 shadow-sm flex flex-col gap-6 shrink-0">
          <h1 className="text-2xl font-extrabold tracking-tight border-b border-slate-100 dark:border-gray-700 pb-4 text-center lg:text-left">
            My Profile
          </h1>

          <div className="flex flex-col gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-0.5">
                Username
              </p>
              <p className="font-medium text-slate-800 dark:text-gray-200">
                {user?.username || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-0.5">
                Email Address
              </p>
              <p className="font-medium text-slate-800 dark:text-gray-200 truncate">
                {user?.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-0.5">
                Password
              </p>
              <p className="font-medium text-slate-600 dark:text-gray-400 tracking-widest">
                {user?.password
                  ? "*".repeat(Math.min(user.password.length, 12))
                  : "********"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-gray-500 mb-0.5">
                Total Contributions
              </p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                {postCount || 0} {postCount === 1 ? "Post" : "Posts"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 dark:bg-gray-700 dark:hover:bg-red-950/30 dark:text-gray-200 dark:hover:text-red-400 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            Logout Account
          </button>
        </aside>

        {/* Recent Posts Workspace Container */}
        <main className="w-full flex-1 bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700/60 rounded-2xl p-6 sm:p-8 shadow-sm min-h-[600px] flex flex-col">
          <h2 className="font-extrabold text-2xl tracking-tight mb-6 text-slate-900 dark:text-white">
            Recent Posts
          </h2>

          {filterPost.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 dark:text-gray-500 py-12">
              <span className="text-4xl mb-2">📬</span>
              <p className="text-lg font-medium">No active updates yet</p>
              <p className="text-sm">
                Your published content will appear inside this feed container
                grid.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterPost.map((item) => {
                const slug =
                  item.slug || (createSlug ? createSlug(item.title) : "");

                return (
                  <article
                    key={item.id || item.title}
                    className="flex flex-col bg-slate-50 dark:bg-gray-900/50 border border-slate-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Cover Frame */}
                    {item.image && (
                      <div className="w-full h-44 overflow-hidden bg-slate-200 dark:bg-gray-800">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Content Detail Layer */}
                    <div className="p-4 flex flex-col flex-1 gap-3">
                      <Link
                        to={`/blogDetails/${item.id}/${slug}`}
                        className="group"
                      >
                        <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition-colors">
                          {item.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-2 leading-relaxed flex-1">
                        {item.content ? `${item.content.slice(0, 100)}...` : ""}
                      </p>

                      {/* Grid Item Footer Actions */}
                      <div className="pt-3 mt-1 border-t border-slate-200/60 dark:border-gray-700/60 flex items-center justify-between">
                        <div className="text-[11px] text-slate-400 dark:text-gray-500">
                          <p className="font-medium truncate max-w-[120px]">
                            By {item.username || "You"}
                          </p>
                          <p>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString()
                              : ""}
                          </p>
                        </div>

                        {/* Interactive Tool Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEdit(item)}
                            title="Edit Post"
                            className="p-2 text-slate-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-all text-sm cursor-pointer"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteData(item.id)}
                            title="Delete Post"
                            className="p-2 text-slate-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-all text-sm cursor-pointer"
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Profile;
