import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Switch } from 'antd'; // Import Switch dari Ant Design
import logo from '../components/logo.jpg'; // Path logo

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        document.documentElement.classList.toggle('dark', checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const values = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        setLoading(true);
        setError('');
        setSuccess('');

        const loginUrl = 'login/admin/';

        try {
            const response = await axiosInstance.post(loginUrl, values);
            setSuccess('Login berhasil!');
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail || 'Login gagal, coba lagi.');
            } else {
                setError('Terjadi kesalahan, coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <motion.div
                className={`p-8 rounded-lg shadow-lg w-full max-w-4xl flex ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Left Section */}
                <div className="w-1/2 flex flex-col items-center justify-center">
                    <img src={logo} alt="Logo HABIB KOMPUTER" className="w-32 h-32 mb-4 rounded-full" />
                    <h2 className={`text-2xl font-extrabold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        LOGIN ADMIN<br />HABIB KOMPUTER
                    </h2>
                </div>

                {/* Right Section */}
                <div className="w-1/2">
                    {/* Toggle Switch */}
                    <div className="flex justify-end mb-4">
                        <Switch
                            checked={darkMode}
                            onChange={toggleDarkMode}
                            checkedChildren="Dark"
                            unCheckedChildren="Light"
                            className="transition duration-200"
                        />
                    </div>

                    {/* Error & Success Messages */}
                    {error && <div className="mb-4 text-red-500 text-center text-sm">{error}</div>}
                    {success && <div className="mb-4 text-green-500 text-center text-sm">{success}</div>}

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Email
                            </label>
                            <div
                                className={`flex items-center border rounded-md ${
                                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                                }`}
                            >
                                <span className={`p-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input
                                    className={`flex-grow p-2 focus:outline-none focus:ring-2 ${
                                        darkMode
                                            ? 'focus:ring-blue-700 text-white bg-gray-700 border-transparent placeholder-gray-400'
                                            : 'focus:ring-blue-500 text-black bg-white placeholder-gray-500'
                                    }`}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                Password
                            </label>
                            <div
                                className={`flex items-center border rounded-md ${
                                    darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'
                                }`}
                            >
                                <span className={`p-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                                <input
                                    className={`flex-grow p-2 focus:outline-none focus:ring-2 ${
                                        darkMode
                                            ? 'focus:ring-blue-700 text-white bg-gray-700 border-transparent placeholder-gray-400'
                                            : 'focus:ring-blue-500 text-black bg-white placeholder-gray-500'
                                    }`}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full py-2 rounded-md transition duration-200 focus:outline-none ${
                                darkMode
                                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>

                    {/* Additional Options */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/forgot-password')}
                            className={`text-sm underline ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}
                        >
                            Lupa Password?
                        </button>
                    </div>
                    <div className="mt-2 text-center">
                        <button
                            onClick={() => navigate('/register')}
                            className={`text-sm underline ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}
                        >
                            Buat Akun
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
