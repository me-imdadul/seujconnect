"use client";
import HomeArticleCard from "@/components/HomeArticleCard/HomeArticleCard";
import { SECRET_KEY } from "@/utils/constants/api";
import React, { useEffect, useState } from "react";

function HomeArticle() {
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
    <div className="w-full px-14">
      <div className="">
        <h1 className="text-4xl font-bold my-8">Most Recent Articles</h1>
        <div className="p-3 grid grid-cols-3 gap-5">
          {articles
            .reverse()
            .slice(0, 9)
            .map((article) => {
              return <HomeArticleCard key={article?._id} article={article} />;
            })}
        </div>
        <h1 className="text-4xl font-bold my-8">Top Article</h1>
        <div className="grid grid-cols-3 my-6">
          {articles
            .reverse()
            .slice(0, 6)
            .map((article) => {
              return <HomeArticleCard key={article?._id} article={article} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default HomeArticle;
