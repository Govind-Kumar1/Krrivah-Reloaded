import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Suspense, lazy } from 'react'

// Lazy imports for pages
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Design = lazy(() => import('./pages/Design.jsx'))
const Blogs = lazy(() => import('./pages/Blogs.jsx'))
const Contacts = lazy(() => import('./pages/Contacts.jsx'))
const Project = lazy(() => import('./pages/Project.jsx'))
const BlogDetails = lazy(() => import('./pages/BlogDetails.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))

// Components
import Footer from './components/Footer.jsx'

// Loading UI Component
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#0f172a',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      color: 'white'
    }}>
      <div className="spinner" style={{
        width: '50px',
        height: '50px',
        border: '6px solid rgba(255,255,255,0.3)',
        borderTop: '6px solid #38bdf8',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ marginTop: '15px', opacity: 0.8 }}>Loading...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

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
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/design" element={<Design />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/blogdetails/:id" element={<BlogDetails />} />
            <Route path="/projectdetails" element={<ProjectDetail />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  )
}

export default App
