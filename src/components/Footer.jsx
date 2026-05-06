import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <section className="shadow-[0_0_20px_rgb(50,50,50)] dark:bg-gray-900 dark:text-white">
      <div className="h-10 w-full flex items-center justify-center">
        <h2 className="text-lg flex items-center gap-2">
          <FaHeart /> Prateek Bahad{" "}
        </h2>
      </div>
    </section>
  );
};

export default Footer;
