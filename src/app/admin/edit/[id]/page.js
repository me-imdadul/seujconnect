"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { slugify } from "@/utils/slugify";
import { SECRET_KEY } from "@/utils/constants/api";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditArticle({ params }) {
  const { id } = params;
  const { data: session, Status } = useSession();

  const router = useRouter();
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState("");

  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);

  const categories = [
    "Technology",
    "Health",
    "Finance",
    "Education",
    "Travel",
    "Lifestyle",
  ];

  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      EditArticle: {},
    }),
    []
  );
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

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setLoading(false);
      setTags(data.tags);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!session) {
    return router.push("/auth/login/");
  }
  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setFile(reader.result); // Sets file as base64 string
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError(null);

    if (!file) {
      setLoading(false);
      setError("Thumb image empty");
      return;
    }

    const articleData = {
      title,
      content,
      category,
      user: session.user.email,
      author: session.user.username,
      views: "0",
      likes: "0",
      comments: [],
      tags: tags,
      published: new Date(),
      status: "published",
      thumbimage: file,
      slug: slugify(title),
    };

    try {
      const response = await fetch(`/api/articles/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SECRET_KEY,
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error("Failed to add article");
      }

      if (response.status == 200) {
        setSuccess("Article Updated");
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-20 py-4 bg-gray-100">
      <div className="flex items-center justify-end ">
        {/* <h1 className="text-xl font-bold my-6">Add New Article</h1> */}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white  p-6 rounded-lg shadow-md w-full "
      >
        <div className="flex justify-between items-center my-4">
          <div className="mb-4 w-full items-center">
            <div className="w-full flex gap-2 items-center justify-between">
              <div className="w-full mb-6">
                <Link
                  className="text-center px-5 inline-flex items-center py-3 rounded-3xl border border-black"
                  href={"/admin/dashboard"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="mx-2 rotate-180"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                  Back
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-10 text-white py-3 bg-black hover:bg-lime-400 rounded-full transition-all duration-300"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
            <div>
              <label
                className="block text-xl font-medium text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="my-4">
              <label htmlFor="thumbimg">Thumbnail</label>
              <input
                id="thumbimg"
                type="file"
                accept="image/*"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          {/* <label
            className="block text-xl font-medium text-gray-700"
            htmlFor="content"
          >
            Content
          </label> */}
          <div className="h-full w-full">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={handleChange}
              className="w-full h-full mt-10 bg-white"
            />
            <style>{`.jodit-wysiwyg{height:70vh !important}`}</style>
          </div>
        </div>
        <div className="flex -mx-3 mb-2 gap-4 items-center justify-between">
          <div className="my-4 w-full">
            <label htmlFor="category">Category</label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                disabled={loading}
                className="block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="my-4 w-full">
            <label htmlFor="tags" className="text-lg font-medium">
              Tags
            </label>
            <div className="relative flex">
              <input
                id="tags"
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Enter a tag"
                className={`block appearance-none w-full bg-gray-200 border border-gray-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
              />
              <button
                type="button"
                className="bg-black   px-5 py-2 text-white absolute inset-y-0 right-0"
                onClick={handleAddTag}
                variant="outline"
              >
                Add Tag
              </button>
            </div>
            <AnimatePresence>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${"bg-lime-100 text-black"}`}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 focus:outline-none"
                    >
                      <span className="h-4 w-4">x</span>
                    </button>
                  </motion.span>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </form>
    </div>
  );
}
