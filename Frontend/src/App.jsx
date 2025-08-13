import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Design from './pages/Design.jsx'
import Blogs from './pages/Blogs.jsx'
import Contacts from './pages/Contacts.jsx'
import Project from './pages/Project.jsx'
 import BlogDetails from './pages/BlogDetails.jsx' 
import ProjectDetail from './pages/ProjectDetail.jsx'
// import InnaraSection from '../../../../krrivah/src/components/ProjectDetailComponents/InnaraSection.jsx'
// import OceiaSection from '../../../../krrivah/src/components/ProjectDetailComponents/OceiaSection.jsx'
// import SingleProject from './components/ProjectDetailComponents/SingleProject.jsx'
function App() {
  return ( 
    <>
      {/* Toast container for global use */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Application Routes */}
      <Router> 
        {/* <Navbar /> if needed globally */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/design" element={<Design />} />
          <Route path="/blogs" element={<Blogs />} /> 
          <Route path="/contact" element={<Contacts />} />
          <Route path="/projects" element={<Project />} />
            <Route path="/blogdetails/:id" element={<BlogDetails />} />
          <Route path="/projectdetails" element={<ProjectDetail />} /> 
          <Route path="/project/:id" element={<ProjectDetail/>} />
          {/* <Route path="/innara" element={<InnaraSection />} />

        <Route path="/la-oceia" element={<OceiaSection />} /> */}
        </Routes>
        <Footer />
      </Router> 
    </>
  ) 
}

export default App
