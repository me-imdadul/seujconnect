import Link from "next/link";
import React from "react";

const HomeArticleCard = ({ article }) => {
  var onepara = article?.content;
  const firstParagraphMatch = onepara.match(/<p[^>]*>(.*?)<\/p>/);
  const firstParagraphText = firstParagraphMatch
    ? firstParagraphMatch[1].replace(/<\/?[^>]+(>|$)/g, "")
    : "";
  const para = firstParagraphText.substring(0, 200);

  return (
    <div className="m-3 ">
      <div className="h-96">
        <img
          src={article?.thumbimage || "/not-found.jpg"}
          className="rounded-3xl h-full w-full object-cover"
          alt={article?.title}
        />
      </div>
      <div className="p-4">
        <Link
          href={"#"}
          className="px-7 py-2 inline-block my-2 border-[1px] border-lime-400 hover:text-white hover:bg-lime-400 rounded-full transition-all duration-300"
        >
          {article?.category}
        </Link>
        <h1 className="text-2xl font-bold mt-3">{article?.title}</h1>
        <h3 className="text-zinc-400 my-1">
          {para}
          {"..."}
        </h3>
        <div className="items-center flex justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
              className="mx-2"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            <h3 className="text-zinc-500 ">{article?.author || "Unknown"}</h3>
          </div>
          <Link
            href={`/articles/${article?._id}/`}
            className="border-[1px] mt-2 flex items-center rounded-full border-lime-400 px-6 py-2 hover:text-white  hover:bg-lime-400 duration-300 transition-all"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right-short"
              className="mx-1"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeArticleCard;
