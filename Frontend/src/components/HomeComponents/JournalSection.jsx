import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JournalSection = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleViewAllClick = () => {
    navigate("/blogs");
  };

  const handleCardClick = (id) => {
    navigate(`/blogdetails/${id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blog");
        const data = await response.json();
        if (data.success) {
          setPosts(data.data.slice(0, 3)); // ✅ Show only 3 latest
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options).toUpperCase();
  };

  return (
    <section className="bg-[#EAEDE5] w-full py-10 md:py-24 px-6 md:px-16">
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-20 items-start">
        {/* Left Title */}
        <div className="flex-1">
          <p className="text-[18px] text-[#5F5F5F] font-medium mb-10 md:mb-40 uppercase tracking-widest">
            Blog
          </p>
          <h2 className="text-3xl sm:text-[56px] font-serif leading-[1.2] text-[#393F36] mb-12 w-full">
            Architecture & <br /> Insight.
          </h2>
          <button
            onClick={handleViewAllClick}
            className="flex items-center text-[#2E2E2E] gap-2 text-sm font-semibold uppercase tracking-wider hover:cursor-pointer"
          >
            View All
            <ChevronRight
              className="border border-gray-400 rounded-full bg-white"
              size={28}
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Right Cards Section */}
        <div className="w-full">
          {/* Mobile: Horizontal Scroll */}
          <div className="xl:hidden w-full overflow-x-auto">
            <div className="flex gap-6 w-max px-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handleCardClick(post.id)}
                  className="w-[300px] bg-white shadow-sm h-[420px] flex-shrink-0 overflow-hidden hover:cursor-pointer"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-[180px] object-cover"
                  />
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs font-semibold uppercase text-[#393F36] mb-2 tracking-wide">
                      {post.category}{" "}
                      <span className="text-gray-400">
                        • {formatDate(post.date)}
                      </span>
                    </p>
                    <h3 className="text-md font-semibold text-[#2E2E2E] mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#5F5F5F] leading-relaxed line-clamp-3">
                      {post.short_des || "No description available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden xl:grid grid-cols-3 gap-10 mt-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleCardClick(post.id)}
                className="bg-white overflow-hidden shadow-sm w-[300px] h-[450px] flex flex-col hover:cursor-pointer"
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs font-semibold uppercase text-[#393F36] mb-2 tracking-wide">
                    {post.category}{" "}
                    <span className="text-gray-400">
                      • {formatDate(post.date)}
                    </span>
                  </p>
                  <h3 className="text-md font-semibold text-[#2E2E2E] mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#5F5F5F] leading-relaxed line-clamp-3">
                    {post.short_des || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JournalSection;
