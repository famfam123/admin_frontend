import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig'; // Import axiosInstance yang sudah dibuat
import { motion } from 'framer-motion'; // Import Framer Motion
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import Font Awesome Icon
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; // Import ikon yang ingin digunakan

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

        const loginUrl = 'login/admin/'; // Hapus baseURL karena sudah diatur di axiosInstance

        try {
            const response = await axiosInstance.post(loginUrl, values);
            setSuccess('Login berhasil!');
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            navigate('/dashboard'); // Ganti dengan route dashboard admin
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.8 }} // Animasi awal
                animate={{ opacity: 1, scale: 1 }} // Animasi saat ditampilkan
                transition={{ duration: 0.3 }} // Durasi animasi
            >
                <h2 className="text-2xl font-bold text-center mb-6">Login Admin</h2>
                {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                {success && <div className="mb-4 text-green-500 text-sm">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="email">
                            Email
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <span className="p-2 text-gray-500">
                                <FontAwesomeIcon icon={faEnvelope} /> {/* Ikon email */}
                            </span>
                            <input
                                className="flex-grow p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <span className="p-2 text-gray-500">
                                <FontAwesomeIcon icon={faLock} /> {/* Ikon kunci */}
                            </span>
                            <input
                                className="flex-grow p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white py-2 rounded-md transition duration-200 hover:bg-blue-700 focus:outline-none ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
