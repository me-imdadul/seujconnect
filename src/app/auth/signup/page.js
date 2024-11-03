"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SECRET_KEY } from "@/utils/constants/api";

const Page = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SECRET_KEY,
      },
      body: JSON.stringify({ email, password, username, phone }),
    });
    const data = await res.json();

    if (res.status == 409) {
      setError("User already exists.");
      return;
    }

    if (res.status == 200) {
      setError("");
      setSuccess("Registration Successful! Login now");
      setUsername("");
      setPhone("");
      setEmail("");
      setPassword("");
    } else {
      console.log(data);
    }
  };

  return (
    <div className="w-full flex justify-center items-center login-container">
      <div className="w-[30vw] mt-10 p-4 h-auto shadow-lg rounded-3xl">
        <div className="my-4 text-center">
          <h1 className="text-3xl font-bold text-center">Create an Account</h1>
        </div>
        <div className="mx-20 py-4">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="w-full max-w-sm min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Name
                </label>
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Full Name"
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                />
              </div>

              <div className="w-full max-w-sm my-5 min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Phone
                </label>
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                />
              </div>

              <div className="w-full max-w-sm min-w-[200px] my-5">
                <label className="block mb-2 text-sm text-slate-600">
                  Email
                </label>
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="example@gmail.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="w-full max-w-sm my-5 min-w-[200px]">
                <label className="block mb-2 text-sm text-slate-600">
                  Password
                </label>
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Password"
                  type="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="text-center">
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button
                type="submit"
                className="px-10 text-white my-7 py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center">
            <p>
              <>
                Already have an account?{" "}
                <Link
                  href={"/auth/login"}
                  className="text-blue-400 cursor-pointer"
                >
                  Login
                </Link>
              </>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
