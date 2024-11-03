"use client";
import ArticleTag from "@/components/ArticleTag/ArticleTag";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import SideBarArticle from "@/components/SideBarArticleCard/SideBarArticleCard";
import { SECRET_KEY } from "@/utils/constants/api";
import { formatDate } from "@/utils/format";
import DOMPurify from "dompurify";

import Link from "next/link";

import React, { useState, useEffect } from "react";

const Page = ({ params }) => {
  const { id } = params;

  const [article, setArticle] = useState({});
  const [similar, setSimilar] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const likedPost = [];

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/articles/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SECRET_KEY,
        },
      });
      const data = await response.json();
      setArticle(data);
      setLikes(Number.parseInt(data.likes));
      fetchSimilarArticle(data.tags, data._id);
      // fetchPopularArticle();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleUserLike = (articleId) => {
    addLike(articleId, likes);
    setLiked(true);

    // if (!likedPost.includes(articleId)) {
    //   try {
    //     const response = [];
    //   } catch (e) {
    //     console.log("Error while liking the post");
    //   }
    // } else {
    //   if (likes > 0) {
    //     setLikes((prev) => prev - 1);
    //     setLiked(false);
    //   }
    // }
  };

  const fetchSimilarArticle = async (tags, id) => {
    try {
      const response = await fetch("/api/articles/similar/", {
        method: "POST",
        body: JSON.stringify({ tags: tags, id: id }),
        headers: {
          "x-api-key": SECRET_KEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSimilar(data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchPopularArticle = async () => {
    try {
      const response = await fetch("/api/articles/popular/", {
        method: "GET",
        headers: {
          "x-api-key": SECRET_KEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPopular(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addLike = async (id, like) => {
    try {
      const response = await fetch("/api/articles/admin/like/", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          like: Number.parseInt(like + 1),
        }),
        headers: {
          "x-api-key": SECRET_KEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLikes((prev) => prev + 1);
      console.log(likes);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full px-20 py-4 flex">
      <div className="main-content w-2/3 px-20 ">
        <div className="article-breadcrumb flex gap-4 my-5">
          {article && (
            <Breadcrumb path={`/articles/${article?.slug || "not-found"}`} />
          )}
        </div>
        <h1 className="text-4xl my-4 font-bold">{article?.title}</h1>

        <div className="header-img">
          <img
            src={article?.thumbimage || "/not-found.jpg"}
            className="rounded-2xl object-cover w-full h-[400px]"
            alt="heading-image"
          />
        </div>

        <div className="flex justify-between  my-6">
          <div className="flex items-center gap-6">
            <h3 className="font-bold">Imdadul</h3>
            <span>•</span>
            <h3>{article?.category}</h3>
            <span>•</span>
            <h3>{formatDate(article?.published || "01 Jan, 2024")}</h3>
          </div>

          <div className="flex items-center gap-2 text-center justify-center">
            <p>{likes}</p>
            <img
              onClick={() => handleUserLike(article._id)}
              src={`${liked ? "/liked.svg" : "/likes.svg"}`}
              className={`h-7 ${liked ? "scale-110" : "scale-100"}`}
              alt=""
            />
          </div>
        </div>

        <div className="relative article-content my-5">
          <hr />
          {article && (
            <div
              className="article-content my-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article?.content),
              }}
            ></div>
          )}

          <div className="article-content-footer">
            <hr className="my-5" />
            <div className="flex items-center justify-end gap-4">
              <span className="font-bold">Tags:</span>
              {article?.tags?.map((tag) => {
                return (
                  <Link
                    href={"#"}
                    key={article._id}
                    className="p-2 bg-lime-400 rounded-3xl"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>
            <hr className="my-5" />

            <div className="flex items-center justify-between">
              {/* <button className="px-5 text-white py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300">
                Previous Post
              </button>
              <button className="px-5 text-white py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300">
                Next Post
              </button> */}
            </div>

            <div className="share-social p-10 bg-zinc-100 my-8">
              <h1 className="text-2xl font-bold text-center hover:underline hover:underline-offset-4 transition-all duration-300">
                Share This Article
              </h1>
              <ul className="flex gap-7 items-center justify-center my-4">
                <li>
                  <a
                    class="icon"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwp.egenstheme.com%2Fzorik%2Fhome-organization-tips-for-a-clutter-free-space%2F"
                  >
                    <svg
                      width="6"
                      height="12"
                      viewBox="0 0 6 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.81526 11.2483V6.46735H5.42818L5.66793 4.59543H3.81526V3.4031C3.81526 2.86293 3.96576 2.4931 4.74101 2.4931H5.72334V0.824182C5.24538 0.77296 4.76495 0.748228 4.28426 0.750099C2.85859 0.750099 1.87976 1.62043 1.87976 3.21818V4.59193H0.277344V6.46385H1.88326V11.2483H3.81526Z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    class="icon"
                    href="https://x.com/intent/tweet?text=Home+Organization+Tips+for+a+Clutter-Free+Space&amp;url=https%3A%2F%2Fwp.egenstheme.com%2Fzorik%2Fhome-organization-tips-for-a-clutter-free-space%2F"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path d="M11.025 0.65625H13.1722L8.48225 6.0305L14 13.3438H9.68012L6.2965 8.9075L2.42462 13.3438H0.2765L5.29287 7.595L0 0.65625H4.43013L7.48825 4.71012L11.025 0.65625ZM10.2725 12.0557H11.4625L3.78262 1.87687H2.50688L10.2725 12.0557Z"></path>
                      </g>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    class="icon"
                    href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fwp.egenstheme.com%2Fzorik%2Fhome-organization-tips-for-a-clutter-free-space%2F&amp;title=Home+Organization+Tips+for+a+Clutter-Free+Space"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.90719 4.1972C3.61209 4.1972 4.18353 3.62576 4.18353 2.92086C4.18353 2.21597 3.61209 1.64453 2.90719 1.64453C2.20229 1.64453 1.63086 2.21597 1.63086 2.92086C1.63086 3.62576 2.20229 4.1972 2.90719 4.1972Z"></path>
                      <path d="M5.38752 5.16523V12.2463H7.5861V8.74457C7.5861 7.82057 7.75994 6.92573 8.9056 6.92573C10.0355 6.92573 10.0495 7.98215 10.0495 8.8029V12.2469H12.2493V8.36365C12.2493 6.45615 11.8386 4.99023 9.60911 4.99023C8.53869 4.99023 7.82119 5.57765 7.52777 6.13357H7.49802V5.16523H5.38752ZM1.80469 5.16523H4.00677V12.2463H1.80469V5.16523Z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    class="icon"
                    href="https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwp.egenstheme.com%2Fzorik%2Fhome-organization-tips-for-a-clutter-free-space%2F&amp;media=https://wp.egenstheme.com/zorik/wp-content/uploads/2024/07/travel-39.webp&amp;description=Home+Organization+Tips+for+a+Clutter-Free+Space"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pinterest"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="article-comment-box bg-zinc-100 p-10">
              <div className="">
                <h1 className="text-xl font-bold">Leave Your Comment</h1>
                <p>
                  Your email address will not be published.
                  <span className="">
                    Required fields are marked
                    <span className="font-bold">*</span>
                  </span>
                </p>
                <div className="input-boxes my-3 gap-4 flex items-center justify-between">
                  <input
                    type="text"
                    className="w-1/2 px-6 py-3 bg-white"
                    placeholder="Entyer your name*"
                    required
                  />
                  <input
                    type="email"
                    className="w-1/2 px-6 py-3 bg-white"
                    placeholder="Entyer your email*"
                    required
                  />
                </div>

                <input
                  type="text"
                  className="w-full h-20 text-start px-4"
                  placeholder="Your Message*"
                  height={300}
                />

                <button className="px-10 text-white my-7 py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-article w-1/3">
        {similar.length == 0 ? (
          <div></div>
        ) : (
          <div className="border-2 border-black w-full justify-center items-center p-6 my-6">
            <h1 className="text-center text-xl bg-lime-400 font-bold  rounded-full inline-block px-5 py-2">
              Similar Article
            </h1>
            {similar.map((article) => {
              return <SideBarArticle key={article?._id} article={article} />;
            })}
          </div>
        )}

        {/* {popular.length == 0 ? (
          <div></div>
        ) : (
          <div className="border-2 border-black w-full justify-center items-center p-6 my-6">
            <h1 className="text-center text-xl bg-lime-400 font-bold  rounded-full inline-block px-5 py-2">
              Popular Article
            </h1>
            {popular.map((article) => {
              return <SideBarArticle article={article} />;
            })}
          </div>
        )} */}

        <div>
          <h1 className="my-2">Tags</h1>
          {article?.tags?.map((tag) => {
            return <ArticleTag key={article._id} tag={tag} />;
          })}
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
};

export default Page;
