"use client";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import { SECRET_KEY } from "@/utils/constants/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard/ArticleCard";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const route = useRouter();
  const [articles, setArticles] = useState([]);
  const [pendingArticles, setPendingArticles] = useState([]);
  const [rejectedArticles, setRejectedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] = useState({
    views: "0",
    comments: "0",
    likes: "0",
    articles: "0",
  });

  const fetchData = async () => {
    if (!session) return;
    if (status === "loading") {
      return;
    }
    if (!session) {
      route.push("/auth/login/");
    }
    try {
      const response = await fetch("/api/articles/admin/", {
        method: "POST",
        body: JSON.stringify({
          author_id: session.user.email,
          status: "published",
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SECRET_KEY,
        },
      });
      const data = await response.json();

      setArticles(data);
      console.log(data);

      const totalViews = data.reduce(
        (sum, article) => sum + (Number.parseInt(article.views) || 0),
        0
      );
      const totalComments = data.reduce(
        (sum, article) => sum + (Number.parseInt(article.comments) || 0),
        0
      );
      const totalLikes = data.reduce(
        (sum, article) => sum + (Number.parseInt(article.likes) || 0),
        0
      );

      setDashboardData({
        views: totalViews,
        comments: totalComments,
        likes: totalLikes,
        articles: data.length,
      });

      console.log(dashboardData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchPending = async () => {
    if (!session) return;
    if (status === "loading") {
      return;
    }
    if (!session) {
      route.push("/auth/login/");
    }
    try {
      const response = await fetch("/api/articles/admin/", {
        method: "POST",
        body: JSON.stringify({
          author_id: session.user.email,
          status: "pending",
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SECRET_KEY,
        },
      });
      const data = await response.json();

      setPendingArticles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchRejected = async () => {
    if (!session) return;
    if (status === "loading") {
      return;
    }
    if (!session) {
      route.push("/auth/login/");
    }
    try {
      const response = await fetch("/api/articles/admin/", {
        method: "POST",
        body: JSON.stringify({
          author_id: session.user.email,
          status: "rejected",
        }),
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SECRET_KEY,
        },
      });
      const data = await response.json();

      setRejectedArticles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/articles/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SECRET_KEY,
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    fetchPending();
    fetchRejected();
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between pb-8 border-b">
          <div className="flex items-center bg-zinc space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Author Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <div className="flex">
                <h1 className="text-3xl font-bold text-gray-800">
                  {session?.user?.username}
                </h1>
                <LogoutButton />
              </div>

              <p className="text-lg text-gray-600">{session?.user?.phone}</p>
            </div>
          </div>
          <Link
            href={"/admin/add/"}
            className="px-6 py-3 bg-black duration-300 text-white font-semibold rounded-3xl hover:bg-lime-400 transition-all"
          >
            Add New Article
          </Link>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          <div className="bg-slate-200 border-l-8 border-lime-400 shadow-md  justify-center text-center rounded-3xl p-4">
            <p className="text-4xl font-bold my-2">{dashboardData.views}</p>
            <h3 className="text-sm text-center font-semibold text-gray-500">
              Total Views
            </h3>
          </div>

          <div className="bg-slate-200 border-l-8 border-lime-400 shadow-md text-center rounded-3xl p-4">
            <p className="text-4xl font-bold  my-2">{dashboardData.comments}</p>
            <h3 className="text-sm text-center font-semibold text-gray-500">
              Comments
            </h3>
          </div>

          <div className="bg-slate-200 border-l-8 border-lime-400 shadow-md text-center rounded-3xl p-4">
            <p className="text-4xl font-bold my-2">{dashboardData.likes}</p>
            <h3 className="text-sm text-center  font-semibold text-gray-500 mb-4">
              Likes
            </h3>
          </div>

          <div className="bg-slate-200 border-l-8 border-lime-400 shadow-md text-center rounded-3xl p-4">
            <p className="text-4xl font-bold my-2">{dashboardData.articles}</p>
            <h3 className="text-sm text-center  font-semibold text-gray-500">
              Total Articles
            </h3>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            My Articles
          </h2>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 underline underline-offset-8 py-3 text-left text-sm font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="px-6 py-3 underline underline-offset-8 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-3 underline underline-offset-8 text-left text-sm font-semibold text-gray-600">
                    Views
                  </th>
                  <th className="px-6 py-3 underline underline-offset-8 text-left text-sm font-semibold text-gray-600">
                    Comments
                  </th>
                  <th className="px-6 py-3 underline underline-offset-8 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              {articles.length == 0 ? (
                <div className="p-3">No article published yet!</div>
              ) : (
                <tbody className="">
                  {articles
                    .map((article) => {
                      return (
                        <ArticleCard
                          key={article?._id}
                          article={article}
                          onDelete={handleDelete}
                        />
                      );
                    })
                    .reverse()}
                </tbody>
              )}
            </table>
          </div>
        </section>
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            My Pending Article
          </h2>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Comments
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              {pendingArticles.length == 0 ? (
                <div className="p-3">No Pending article!</div>
              ) : (
                <tbody className="">
                  {pendingArticles
                    .map((article) => {
                      return (
                        <ArticleCard
                          key={article?._id}
                          article={article}
                          onDelete={handleDelete}
                        />
                      );
                    })
                    .reverse()}
                </tbody>
              )}
            </table>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl inline-block font-semibold text-gray-800 mb-6">
            Rejected Article
          </h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Comments
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              {rejectedArticles.length == 0 ? (
                <div className="p-3">No Rejected article!</div>
              ) : (
                <tbody className="">
                  {rejectedArticles
                    .map((article) => {
                      return (
                        <ArticleCard
                          key={article?._id}
                          article={article}
                          onDelete={handleDelete}
                        />
                      );
                    })
                    .reverse()}
                </tbody>
              )}
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Dashboard;
