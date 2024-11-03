import Link from "next/link";

import React from "react";

export default function AdminHeader() {
  return (
    <header className="px-20 py-6">
      <div className="admin-header">
        <Link
          href={"/"}
          className="text-3xl hover:text-lime-400 font-bold cursor-pointer"
        >
          SeujConnect
        </Link>
      </div>
    </header>
  );
}
