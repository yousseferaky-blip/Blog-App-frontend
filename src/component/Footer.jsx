import React from "react";

const Footer = () => {
  return (
    <>
      <div className="mt-8 py-8 w-full md:text-md text-sm bg-black px-8 md:px-[100px] md:flex  md:flex-row md:justify-between md:items-center flex flex-col items-center md:space-y-0 space-y-4 gap-4">
        <div className="flex flex-col items-start gap-4 text-white">
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className="flex flex-col items-start gap-4 text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="flex flex-col  gap-4 text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Term & Condition</p>
          <p>Term & Service</p>
        </div>
      </div>
      <p className="py-4 text-center bg-black text-white">
        All rights reserved @log Market 2024
      </p>
      
    </>
  );
};

export default Footer;
