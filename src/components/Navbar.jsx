import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaBlog } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { FiMoon, FiSun } from "react-icons/fi";
import { IoIosLogIn, IoIosLogOut, IoMdHome } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { MyAuth } from "../context/AuthContext";
import useToggle from "../hooks/useToggle";

const Navbar = () => {
  const { user, handleLogout } = MyAuth();
  const [ darkIsOn, toggleDark ] = useToggle(false);

  return (
    <section className="relative z-10 shadow-lg shadow-gray-500 bg-white text-black dark:bg-gray-900 dark:text-white duration-300">
      <div className="h-20 flex items-center justify-around">
        <h1 className="text-4xl capitalize">my-blog</h1>
        <ul className="flex gap-7 text-xl">
          <li className="hover:text-red-500">
            {" "}
            <Link to="/">
              {" "}
              <IoMdHome />{" "}
            </Link>
          </li>
          <li className="hover:text-red-500">
            {" "}
            <Link to="/blog">
              {" "}
              <FaBlog />{" "}
            </Link>
          </li>
        </ul>
        <div className="flex gap-7 text-xl">
          {user ? (
            <Link to="/login">
              <h2 onClick={handleLogout} className="hover:text-red-500">
                <IoIosLogOut />
              </h2>
            </Link>
          ) : (
            <Link to="/login">
              <h2 className="hover:text-red-500">
                <IoIosLogIn />
              </h2>
            </Link>
          )}
          {user && (
            <Link to="/profile">
              <h2 className="hover:text-red-500">
                <CgProfile />
              </h2>
            </Link>
          )}
          <button onClick={toggleDark} className="hover:text-red-500">
            {darkIsOn ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
