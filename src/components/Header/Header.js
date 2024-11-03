"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import menuData from "./menuData";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="w-full justify-between">
      <div className="flex px-20 pt-8 pb-2">
        <div className="flex items-center w-full justify-between">
          <Link href={"/"} className=" text-3xl text-lime-600 font-bold">
            <img src="/SeujLogo.png" className="h-12" alt="" />
          </Link>
          <div className="px-20">
            <ul className="flex gap-16 text-md font-semibold text-slate-600">
              {menuData.map((menuItem) => {
                return (
                  <li key={menuItem.id}>
                    <Link
                      href={menuItem.link}
                      className="hover:text-lime-400 transition-all duration-300"
                    >
                      {menuItem.title_as}
                    </Link>
                  </li>
                );
              })}

              {/* <li>
                <Link
                  href={"/articles"}
                  className="hover:text-lime-400 transition-all duration-300"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:text-lime-400 transition-all duration-300"
                >
                  Trends
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:text-lime-400 transition-all duration-300"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:text-lime-400 transition-all duration-300"
                >
                  Alerts
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:text-lime-400 transition-all duration-300"
                >
                  Interviews
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="flex gap-4">
          {
            !session ? (
              <Link
                href={"/auth/login"}
                className="buttonfx text-center slidebottomright  text-md w-36 rounded-md hover:text-white"
              >
                Login
              </Link>
            ) : (
              <Link
                href={"/admin/dashboard"}
                className="buttonfx text-center items-center slidebottomright  text-md w-36 rounded-md hover:text-white"
              >
                Dashboard
              </Link>
            )
            // If the user is not authenticated, redirect them to the login page
          }

          {/* <Link
            href={"/signup"}
            className="buttonfx text-center slidebottomright text-md w-36 rounded-md hover:text-white"
          >
            Sign Up
          </Link> */}
        </div>
      </div>
      <hr className="mt-3" />
    </header>
  );
};

export default Header;
