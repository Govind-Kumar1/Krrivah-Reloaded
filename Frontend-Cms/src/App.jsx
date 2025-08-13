import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Suspense, lazy } from 'react'

// Lazy imports
const Project = lazy(() => import('./pages/projectPage'))
const LoginPage = lazy(() => import('./pages/Login'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const DesignPage = lazy(() => import('./pages/DesignPage'))
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'))
const BannerPage = lazy(() => import('./pages/BannerPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))

// Loading UI Component
function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f9f9f9',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
    }}>
      <div className="spinner" style={{
        width: '50px',
        height: '50px',
        border: '6px solid #ccc',
        borderTop: '6px solid #4CAF50',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ marginTop: '15px', color: '#555' }}>Loading...</p>
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
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/admin/dashboard' element={<DashboardPage />} />
            <Route path='/admin/blog' element={<BlogPage />} />
            <Route path='/admin/project' element={<Project />} />
            <Route path='/admin/contact' element={<ContactPage />} />
            <Route path='/admin/design' element={<DesignPage />} />
            <Route path='/admin/statistics' element={<StatisticsPage />} />
            <Route path='/admin/banner' element={<BannerPage />} />
            <Route path='/admin/gallery' element={<GalleryPage />} />
          </Routes>
        </Suspense>
        <ToastContainer position="top-right" autoClose={1500} />
      </Router>
    </>
  )
}

export default App
