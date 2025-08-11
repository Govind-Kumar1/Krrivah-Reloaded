import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Step 1: Import Link

const categories = ["All", "Design", "Projects", "Trends", "Sustainability"];

const POSTS_PER_PAGE = 8;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/blog");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        
        console.log(responseData)
        const postsArray = responseData.data || [];
              
        if (!Array.isArray(postsArray)) {
          console.error("Fetched data is not an array:", postsArray);
          throw new Error("The data received from the server was not in the expected format.");
        }

        setPosts(postsArray);
        setError(null);
      } catch (err) {
        setError("Failed to fetch posts. Please check the server connection and data format.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f3f4f2]">
        <p className="text-xl font-semibold">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f3f4f2]">
        <p className="text-xl text-red-500 font-semibold text-center p-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f4f2] min-h-screen px-4 sm:px-6 py-10 mt-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                cat === activeCategory
                  ? "bg-black text-white scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "All" ? "View all" : cat}
            </button>
          ))}
        </div>

        {/* Grid of blog posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {paginatedPosts.filter((post) => post?.isActive).map((post) => (
            // Step 2: Wrap the card with the Link component
            
            <Link 
              to={`/blogdetails/${post.id}`} // Step 3: Create a dynamic link using the post's ID
              key={post._id || post.id} // The key now goes on the Link component
            >
              <div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group h-full"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/f3f4f2/333333?text=Image+Not+Found`;
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase text-gray-500 font-medium mb-1">
                    {post.category}{" "}
                    <span className="text-gray-400">• {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </p>
                  <h3 className="font-semibold text-gray-900 text-base leading-snug mb-2 h-12 overflow-hidden">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed h-24 overflow-hidden text-ellipsis">
                    {post.short_des}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
            <div className="bg-white shadow-md rounded-full flex items-center divide-x divide-gray-200 overflow-hidden">
                <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm flex items-center gap-1 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                ← <span className="hidden sm:inline">Previous</span>
                </button>
                {getVisiblePages().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && goToPage(page)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                    page === currentPage
                        ? "bg-gray-200 text-black font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${page === "..." ? "cursor-default pointer-events-none" : ""}`}
                >
                    {page}
                </button>
                ))}
                <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm flex items-center gap-1 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                <span className="hidden sm:inline">Next</span> →
                </button>
            </div>
            </div>
        )}
      </div>
    </div>
  );
}
 