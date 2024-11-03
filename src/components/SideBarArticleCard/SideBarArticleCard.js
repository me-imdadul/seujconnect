import { formatDate } from "@/utils/format";
import { useRouter } from "next/navigation";
import React from "react";

const SideBarArticle = ({ article }) => {
  const route = useRouter();
  return (
    <div
      onClick={() => {
        route.replace(`/articles/${article._id}`);
      }}
      className="article-card hover:cursor-pointer flex my-10"
    >
      <img src="/test.jpg" className="w-20 h-20 object-cover" alt="demo" />
      <div className="px-5">
        <h3 className="text-md text-zinc-400">
          {formatDate(article?.published)}
        </h3>
        <h1 className="text-xl">{article?.title}</h1>
      </div>
    </div>
  );
};

export default SideBarArticle;
