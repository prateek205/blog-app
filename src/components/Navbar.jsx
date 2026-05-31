import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBlog } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { IoIosLogIn, IoIosLogOut, IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MyAuth } from "../context/AuthContext";
import useToggle from "../hooks/useToggle";

const Navbar = () => {
  const { user, handleLogout } = MyAuth();
  const [darkIsOn, toggleDark] = useToggle(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setIsOpen(false)}
        >
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 dark:text-white capitalize transition-colors group-hover:text-red-500">
            my-blog
          </h1>
        </Link>

        {/* ================= DESKTOP & TABLET NAVIGATION (md and up) ================= */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav aria-label="Main Navigation">
            <ul className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-1.5 hover:text-red-500 transition-colors py-2"
                >
                  <IoMdHome className="text-lg" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="flex items-center gap-1.5 hover:text-red-500 transition-colors py-2"
                >
                  <FaBlog className="text-base" />
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Vertical Divider */}
          <div
            className="h-5 w-px bg-gray-200 dark:bg-gray-800"
            aria-hidden="true"
          />

          {/* Desktop Utility Tray */}
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            {user && (
              <Link
                to="/profile"
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 transition-all"
                aria-label="Profile"
              >
                <CgProfile className="text-xl" />
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 transition-all cursor-pointer"
                aria-label="Log out"
              >
                <IoIosLogOut className="text-xl" />
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-500 transition-all"
                aria-label="Log in"
              >
                <IoIosLogIn className="text-xl" />
              </Link>
            )}

            <button
              onClick={toggleDark}
              className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-red-500 transition-all cursor-pointer"
              aria-label={
                darkIsOn ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkIsOn ? (
                <FiSun className="text-base" />
              ) : (
                <FiMoon className="text-base" />
              )}
            </button>
          </div>
        </div>

        {/* ================= MOBILE CONTROLS TRAY (sm and down) ================= */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle remains accessible directly outside menu */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-red-500 transition-all text-gray-600 dark:text-gray-300"
            aria-label="Toggle theme"
          >
            {darkIsOn ? (
              <FiSun className="text-base" />
            ) : (
              <FiMoon className="text-base" />
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE EXPANDABLE MENU PANEL ================= */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-200">
          <nav
            className="px-4 pt-2 pb-6 flex flex-col gap-1.5"
            aria-label="Mobile Navigation"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-red-500 transition-colors"
            >
              <IoMdHome className="text-xl" />
              Home
            </Link>

            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-red-500 transition-colors"
            >
              <FaBlog className="text-lg" />
              Blog
            </Link>

            {user && (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-red-500 transition-colors border-t border-gray-100 dark:border-gray-800 mt-2 pt-4"
              >
                <CgProfile className="text-xl" />
                My Profile
              </Link>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors text-left cursor-pointer"
              >
                <IoIosLogOut className="text-xl" />
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:text-red-500 transition-colors"
              >
                <IoIosLogIn className="text-xl" />
                Log In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
