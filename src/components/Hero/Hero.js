"use client";
import React, { useEffect, useState } from "react";
import "keen-slider/keen-slider.min.css";
import LatestArticle from "../HomeLatestArticleCard/HomeLatestArticleCard";
import { SECRET_KEY } from "@/utils/constants/api";
import CarouselSlider from "../CarouselSlider/CarouselSlider";

const Hero = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 flex mt-5 gap-9">
        <CarouselSlider blogPosts={articles.slice(0, 5)} />

        <div className="home-sidebar-article-latest">
          <h1 className="text-4xl font-bold">Latest Article</h1>
          <div className="w-[35vw]">
            {articles
              .reverse()
              .slice(0, 4)
              .map((article) => {
                return <LatestArticle key={article?._id} article={article} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
