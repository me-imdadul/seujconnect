import Link from "next/link";
import React from "react";

const ArticleTag = ({ tag }) => {
  return (
    <Link
      href={"#"}
      className="py-3 mx-1 inline-flex border-[0.5px] border-zinc-300 px-8 hover:bg-black items-center hover:text-white transition-all duration-500 rounded-full"
    >
      {tag}
    </Link>
  );
};

export default ArticleTag;
