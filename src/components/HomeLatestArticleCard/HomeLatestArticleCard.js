"use client";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const LatestArticle = ({ article }) => {
  const router = useRouter();
  var onepara = article?.content;
  const firstParagraphMatch = onepara.match(/<p[^>]*>(.*?)<\/p>/);
  const firstParagraphText = firstParagraphMatch
    ? firstParagraphMatch[1].replace(/<\/?[^>]+(>|$)/g, "")
    : "";
  const para = firstParagraphText.substring(0, 100);

  return (
    <div
      onClick={() => router.push(`/articles/${article._id}`)}
      className="flex cursor-pointer my-5 rounded-xl hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-4">
        <img
          src={article?.thumbimage || "/not-found.jpg"}
          className="h-28 rounded-md w-48 object-cover"
          alt=""
        />
      </div>
      <div className="pr-4 py-4">
        <Link
          href={""}
          className="text-md bg-lime-200  px-4 py-1 mb-1 rounded-full inline-block"
        >
          {article?.category}
        </Link>
        <h1 className="text-2xl font-bold">{article?.title}</h1>
        <h3 className="text-zinc-400">{para}</h3>
        <h3 className="text-sm text-zinc-400">
          {formatDate(article?.published)}
        </h3>
      </div>
    </div>
  );
};

export default LatestArticle;
