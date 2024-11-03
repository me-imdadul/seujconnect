"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })} // Redirect to homepage after signout
      className="px-3 py-1 bg-lime-400 text-sm rounded-xl hover:scale-110 mx-4 transition-all duration-200"
    >
      Logout
    </button>
  );
}
