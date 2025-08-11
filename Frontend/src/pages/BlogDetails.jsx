// src/pages/BlogDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from '../components/Navbar2';
import HeaderSection from '../components/BlogDetailsComponets/HeaderSection';
import ArticleSection from '../components/BlogDetailsComponets/ArticleSection';
import RelatedBlogs from '../components/BlogDetailsComponets/RelatedBlogs';

const API_URL = 'http://localhost:5000/api/blog';

const BlogDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null); // Current post
  const [allBlogs, setAllBlogs] = useState([]); // <-- NEW: State for all blogs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFindBlog = async () => {
      try {
        setLoading(true); // Reset loading state
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Could not fetch blogs from the server.');
        
        const result = await res.json();
        
        setAllBlogs(result.data || []); // <-- NEW: Store all blogs here
        
        const blog = (result.data || []).find((b) => String(b.id) === String(id));

        if (blog) {
          setPost(blog);
        } else {
          setError('Blog with this ID was not found.');
          setPost(null); // Ensure post is null if not found
        }

      } catch (err) {
        console.error(err);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndFindBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Finding your blog...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">{error}</div>;
  }

  if (!post) {
    return <div className="text-center text-gray-500 py-12">Could not display the blog.</div>;
  }
  
  return (
    <>
      <Navbar2 />
      <HeaderSection post={post} />
      <ArticleSection content={post.long_des} mainImage={post.mainImage} />
      
      {/* UPDATE: Passing 'allBlogs' as a prop to avoid re-fetching */}
      <RelatedBlogs 
        category={post.category} 
        currentBlogId={post.id}
        allBlogs={allBlogs} 
      />
    </>
  ); 
};

export default BlogDetail;