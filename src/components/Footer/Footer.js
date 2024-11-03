import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-6 bg-black relative justify-items-center w-full">
      <div className="my-10 w-1/3">
        <h1 className="text-center mt-4 text-3xl font-bold text-white">
          SEUJ CONNECT
        </h1>
        <p className="text-center my-4  leading-7 text-md text-white">
          Welcome! Feel free to mix and match these subcategories based on your
          interests and the preferences of your target audience. these
          subcategories based.
        </p>
      </div>
      <div className="text-center text-white">
        <p>© Copyright 2024 Prismabit Digital Solution LLP.</p>
      </div>
      <Link
        href={"/"}
        className="absolute h-11 w-11 bg-lime-400 flex bottom-6 right-6 rounded-xl justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="black"
          class="bi bi-caret-up-fill"
          viewBox="0 0 16 16"
        >
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg>
      </Link>
    </footer>
  );
};

export default Footer;
