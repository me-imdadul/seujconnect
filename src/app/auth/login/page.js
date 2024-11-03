"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setSuccess("");
      setError("Invalid email or password");
    } else {
      setTimeout(() => {
        router.push("/");
      }, 1000);
      setSuccess("Login Success");
      setError("");
    }
  };

  return (
    <div className="w-full flex justify-center items-center login-container">
      <div className="w-[30vw] mt-10 p-4 h-auto shadow-lg rounded-3xl">
        <div className="my-4 text-center">
          <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
          <p>Login to continue your account.</p>
        </div>
        <div className="mx-20 py-4">
          <form onSubmit={handleSubmit}>
            <div className="w-full max-w-sm min-w-[200px] my-5">
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>

            <div className="w-full max-w-sm my-5 min-w-[200px]">
              <label className="block mb-2 text-sm text-slate-600">
                Password
              </label>
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="Password"
              />
            </div>
            <div className="text-center">
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <button
                type="submit"
                className="px-10 text-white my-7 py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300"
              >
                Login
              </button>
              <p>
                {"Don't have an account?"}
                <Link
                  className="text-blue-400 cursor-pointer"
                  href={"/auth/signup"}
                >
                  {" "}
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
