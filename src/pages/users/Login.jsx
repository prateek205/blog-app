import React, { useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Link } from "react-router-dom";
import { MyAuth } from "../../context/AuthContext";

const Login = () => {
  const {login, setEmail, setPassword} = MyAuth()
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <section className="h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="flex itemx-center justify-center flex-col gap-20 shadow-[0_0_10px_rgb(50,50,50)] dark:shadow-[0_0_10px_rgb(250,250,250)] w-80 h-96 rounded-md px-8">
        <h1 className="text-center text-2xl">Login</h1>
        <form className="flex flex-col gap-10" onSubmit={login}>
          <input
            className="outline-none py-1 px-2 shadow-[0_0_10px_rgb(50,50,50)] rounded-md text-lg bg-transparent dark:shadow-[0_0_5px_rgb(250,250,250)]"
            type="text"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <div className="relative w-full">
            <input
              className="w-full outline-none py-1 px-2 shadow-[0_0_10px_rgb(50,50,50)] rounded-md text-lg bg-transparent dark:shadow-[0_0_5px_rgb(250,250,250)]"
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <p
              onClick={handleToggle}
              className="absolute right-3 top-2 text-xl"
            >
              {show ? <LuEye /> : <LuEyeClosed />}
            </p>
          </div>
          <button className="bg-gray-500 text-white hover:bg-gray-400 hover:text-black py-1 px-2 rounded-md duration-300 dark:shadow-[0_0_5px_rgb(250,250,250)] dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white">
            Log-In
          </button>
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-blue-500 hover:text-blue-400 cursor-pointer font-bold">
                Sign-up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
