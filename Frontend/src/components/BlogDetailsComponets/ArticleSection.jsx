import React from "react";

const ArticleSection = ({ content, mainImage }) => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-4 dark:text-gray-200">
      {mainImage && (
        <img
          src={mainImage}
          alt="Blog main visual"
          className="w-full h-auto rounded-xl mb-8 shadow-md"
        />
      )}

      {content ? (
        <div
          className=" text-[#141415] prose max-w-none prose-img:rounded-xl prose-img:mx-auto prose-p:text-[#535862] prose-headings:text-[#181D27] dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-center text-gray-500">No content available.</p>
      )}
    </section>
  );
};
 
export default ArticleSection;
