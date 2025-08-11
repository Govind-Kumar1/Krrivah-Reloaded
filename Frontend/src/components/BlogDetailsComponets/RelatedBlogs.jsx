// src/components/BlogDetailsComponets/RelatedBlogs.js

import React from 'react';
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// UPDATE: Component ab 'allBlogs' prop lega. useEffect aur state ki zaroorat nahi.
const RelatedBlogs = ({ category, currentBlogId, allBlogs }) => {

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Filtering logic ab seedhe yahan aa jayegi, useEffect ke bahar
  const relatedPosts = allBlogs
    .filter(p => p.category === category && String(p.id) !== String(currentBlogId))
    .slice(0, 3);

  // Agar koi related post nahi hai, to component kuch bhi render nahi karega
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="md:flex flex-row justify-between items-center mb-10">
        <div className="mb-2">
          <p className="text-sm font-medium tracking-wider text-[#2D231A] uppercase">
            Related Blogs
          </p>
          <h2 className="text-3xl font-semibold text-[#393F36] mt-2">
            You Might Also Like
          </h2>
        </div>
        <Link
          to="/blogs"
          className="flex items-center md:border-1 border-[#E7E9E6] text-[#0B2204] md:hover:bg-black md:hover:text-white justify-start md:px-4 py-2 rounded-full text-sm font-medium transition gap-3"
        >
          VIEW ALL
          <ChevronRight
            className="md:hidden bg-[#E3E8E0] text-black rounded-full flex items-center justify-center hover:bg-[#0E0E0E] hover:text-white transition p-1"
            size={30}
            strokeWidth={2}
          />
        </Link>
      </div>

      {/* Blog Cards */}
      <div>
        {/* Mobile: Horizontal Scroll Slider */}
        <div className="sm:hidden w-full overflow-x-auto pb-4">
          <div className="flex gap-4 px-2 w-max">
            {relatedPosts.map((post) => (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className="w-[300px] shrink-0 bg-white h-[450px] shadow-sm transition duration-300 ease-in-out"
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-5 flex flex-col">
                  <p className="text-xs font-semibold uppercase text-[#393F36] mb-2 tracking-wide">
                    {post.category}
                    <span className="text-[#828282]"> • {formatDate(post.date)}</span>
                  </p>
                  <h3 className="text-md font-semibold text-[#2E2E2E] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#5F5F5F] leading-relaxed">
                    {post.short_des}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop View: Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <Link to={`/blogdetails/${post.id}`} key={post.id} className="group">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-52 object-cover mb-4"
              />
              <p className="uppercase text-sm text-[#393F36] font-semibold tracking-wide">
                {post.category}{" "}
                <span className="text-[#828282]">• {formatDate(post.date)}</span>
              </p>
              <h3 className="text-lg font-semibold text-[#2E2E2E] group-hover:underline mt-2">
                {post.title}
              </h3>
              <p className="text-sm text-[#5F5F5F] mt-2">{post.short_des}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBlogs; 