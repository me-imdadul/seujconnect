import { SECRET_KEY } from "@/utils/constants/api";
import { formatDate } from "@/utils/format";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ArticleCard = ({ article, onDelete }) => {
  return (
    <tr className="border-b shadow-md rounded-md hover:bg-gray-200">
      <td className="px-6 py-4">{article?.title}</td>
      <td className="px-6 py-4">{formatDate(article?.published)}</td>
      <td className="px-6 py-4">{article.likes}</td>
      <td className="px-6 py-4">{article.comments.length}</td>
      <td className="px-6 py-4 flex">
        <Link
          href={`/admin/edit/${article?._id}/`}
          className="text-black rounded-3xl px-4 py-1 hover:bg-lime-400 hover:text-white duration-300 transition-all mr-1 "
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(article?._id)}
          className="text-red-500 rounded-3xl px-4 py-1 hover:bg-red-500 hover:text-white duration-300 transition-all "
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ArticleCard;
