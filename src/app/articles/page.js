"use client";
import ArticleTag from "@/components/ArticleTag/ArticleTag";
import SideBarArticle from "@/components/SideBarArticleCard/SideBarArticleCard";
import { SECRET_KEY } from "@/utils/constants/api";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function ArticlesPAge() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/articles/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SECRET_KEY,
        },
      });
      const data = await response.json();

      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full  px-20 py-4 flex">
      <div className="main-content w-2/3 px-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles &&
            articles
              .map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={article.thumbimage || "/not-found.jpg"}
                    alt={""}
                    className="w-full h-56 object-cover object-center"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{article.excerpt}</p>
                    <Link href={`/articles/${article._id}`}>
                      <p className="text-indigo-500 hover:text-indigo-600 font-medium">
                        Read more →
                      </p>
                    </Link>
                  </div>
                </div>
              ))
              .reverse()}
        </div>
        <div className="article-content my-5">
          <div className="article-content-footer">
            <hr className="my-5" />

            <hr className="my-5" />

            <div className="flex items-center justify-between">
              {/* <button className="px-5 text-white py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300">
                Previous Post
              </button>
              <button className="px-5 text-white py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300">
                Next Post
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-article w-1/3">
        <div className="border-2 border-black w-full justify-center items-center p-6 my-6">
          <h1 className="text-center text-xl bg-lime-400 font-bold  rounded-full inline-block px-5 py-2">
            Featured Article
          </h1>

          <SideBarArticle />
          <SideBarArticle />
          <SideBarArticle />
          <SideBarArticle />
          <SideBarArticle />
        </div>
        <div className="border-2 w-full justify-center items-center p-6 my-6">
          <h1 className="text-center inline-flex text-xl items-center bg-lime-400 font-bold  rounded-full  px-5 py-2">
            Discover by Categories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="mx-2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </h1>
          <div className="block items-center my-8 space-x-4 space-y-4">
            <ArticleTag tag={"Technology"} />
            <ArticleTag tag={"Agriculture"} />
            <ArticleTag tag={"Trends"} />
            <ArticleTag tag={"Life Style"} />
            <ArticleTag tag={"Fashion"} />
            <ArticleTag tag={"Foods"} />
            <ArticleTag tag={"Foods"} />
            <ArticleTag tag={"Foods"} />
            <ArticleTag tag={"Life Style"} />
          </div>
        </div>
      </div>
    </div>
  );
}
