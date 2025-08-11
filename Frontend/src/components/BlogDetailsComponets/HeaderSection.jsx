import React from "react";
 const API_URL = "http://localhost:5000/api/blog";
const HeaderSection = ({ post }) => {
  if (!post) {
    return (
        <div className="text-center py-12">
            <h1 className="text-3xl md:text-5xl font-semibold text-[#181D27]">Loading...</h1>
        </div>
    );
  }
   
  const { category, date, title, short_des, mainImage } = post; 

  return (
    <header className="text-center py-12 max-w-[1280px] w-full mx-auto px-4">
      <p className="uppercase text-xs tracking-widest text-[#393F36] mb-2">
        {category} <span className="text-[#828282]">• {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </p>
      <h1 className="text-3xl md:text-5xl font-semibold text-[#181D27] dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-[#141415] max-w-2xl mx-auto text-sm md:text-base">
        {short_des}
      </p> 
      <div className="mt-10 w-full aspect-w-16 aspect-h-9">
        <img
          src={post.thumbnail} // Fallback to thumbnail if mainImage is not available
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
           onError={(e) => {
             e.target.onerror = null;
             e.target.src = `https://placehold.co/1280x720/f3f4f2/333333?text=Image+Not+Found`;
           }}
        />
      </div>
    </header>
  );
};
export default HeaderSection;