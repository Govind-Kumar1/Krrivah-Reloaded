import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";


const LoginPage = () => {
    // State to hold form data (username and password)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // State for loading indicator and error messages
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Handle input changes and update state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);

        try { 
            // API endpoint for login
            const API_URL = `${api_url}/api/auth/login`;

            // Send POST request to the backend
            const response = await axios.post(API_URL, formData, {
                withCredentials: true, // Important for sending/receiving cookies
            }); 

            // If login is successful
            // console.log('Login successful:', response.data);
            setLoading(false);
            
            // Redirect to the admin dashboard or another protected page
            navigate('/admin/dashboard');

        } catch (err) {
            // Handle login errors
            setLoading(false);
            const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(errorMessage); // Display error message using toast
            console.error('Login error:', err);
        }
    };


    return (
        <div className="min-h-screen flex">
            {/* Left Section - Image Background */} 
            <div
                className="relative lg:block w-3/5 bg-cover bg-center"
                style={{ backgroundImage: "url('/pic2.png')" }}
            >
                <div className="absolute top-8 left-8">
                    <img src="/Logo.png" alt="KRRIVAH Logo" className="h-10" />
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-2/5 flex items-center justify-center bg-[#4F594D] p-8">
                <div className="w-full max-w-md">
                    <h2 className="text-white text-3xl font-normal mb-8 text-center uppercase tracking-wider">
                        Login
                    </h2>
                    {/* Attach the submit handler to the form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="text-white px-4 py-3">
                                Username
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Krrivah"
                                className="w-full px-4 py-3 bg-transparent text-white border-b border-white focus:outline-none focus:border-b-2 focus:border-white transition-all duration-200"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="password" className="text-white px-4 py-3">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="********"
                                className="w-full px-4 py-3 bg-transparent border-b border-white text-white focus:outline-none focus:border-b-2 focus:border-white transition-all duration-200"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        {/* Display error message if it exists */}
                        {error && (
                            <p className="text-red-400 text-center mb-4">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-white text-[#4F594D] py-3 text-lg font-semibold rounded hover:bg-gray-200 transition-colors duration-200 uppercase tracking-wider disabled:bg-gray-400"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Logging In...' : 'Log In'}
                        </button>
                    </form> 
                </div>
            </div>
        </div>
    );
};

export default LoginPage;