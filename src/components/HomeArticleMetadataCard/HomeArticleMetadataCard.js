import React from "react";

const HomeArticleMetadataCard = () => {
  return (
    <div className="flex gap-7 mb-2 items-center">
      <div className="flex items-center gap-2">
        <img src="user.svg" className="h-5 fill-lime-300 " alt="" />
        <h1>Author Imdadul</h1>
      </div>
      <div className="flex items-center fill-lime-400 gap-2">
        <img src="like.svg" className="h-5" alt="" />
        <h1>230</h1>
      </div>
      <div className="flex items-center gap-2">
        <img src="comment.svg" className="h-5" alt="" />
        <h1>30</h1>
      </div>
    </div>
  );
};

export default HomeArticleMetadataCard;
