import React from 'react'
import CardsBlogs from '../components/BlogComponents/CardBlogs'
 
import Footer from '../components/Footer'
import Hero from '../components/BlogComponents/Hero'
 
import Navbar2 from '../components/Navbar2'
const Blog = () => {
  return (
     <>
     <Navbar2/>
     {/* <div className="border-t border-black my-4"></div> */}
     <Hero/> 
     <CardsBlogs/>
     {/* <Footer/> */}
     {/* 1025 */}
     </>
  )
}
  
export default Blog