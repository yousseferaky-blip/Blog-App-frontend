import React from "react";
import { BASE_URL } from "../assets/url";

const HomePosts = ({post}) => {
  return (
    <div  className="w-full flex md:flex-row mt-8  space-x-3 flex-col ">
      {/* LEFT */}
      <div className="md:w-[35%] h-[200px] flex justify-center items-center mb-4">
        <img
          className="w-[50%] md:w-full md:h-full object-cover"
          src={`${BASE_URL}/images/${post.photo}`}
        />
      </div>
      {/* RIGHT */}
      <div className="flex flex-col md:w-[65%] w-[90%]">
        <h1 className="text-xl font-medium  md:mr-2 mb-1 md:text-2xl ">{post.title}</h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between space-x-4 md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.createdAt).toString().slice(0,15)}</p>
            <p>{new Date(post.createdAt).toString().slice(16,24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{post.desc}</p>
      </div>
    </div>
  );
};

export default HomePosts;
