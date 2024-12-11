import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineTags, AiOutlineFileText } from 'react-icons/ai';
import Swal from 'sweetalert2';

const AppLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const toggle = () => {
        setCollapsed(prevState => !prevState);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Logout!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                Swal.fire(
                    'Logout berhasil!',
                    'Anda telah keluar dari sistem.',
                    'success'
                );
                navigate('/');
            }
        });
    };

    const checkToken = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/');
        } else {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            if (payload.exp < currentTime) {
                Swal.fire({
                    title: 'Sesi Anda telah habis!',
                    text: 'Token Anda telah kedaluwarsa, silakan login kembali.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    handleLogout();
                });
            }
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    const menuItems = [
        { key: '1', label: 'Dashboard', path: '/dashboard', icon: <AiOutlineDashboard /> },
        { key: '2', label: 'Users', path: '/users', icon: <AiOutlineUser /> },
        { key: '3', label: 'Products', path: '/products', icon: <AiOutlineTags /> },
        { key: '4', label: 'Reports', path: '/reports', icon: <AiOutlineFileText /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div
                className={`bg-blue-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
            >
                <div className="flex items-center justify-center h-16">
                    <h2 className={`text-2xl font-bold ${collapsed ? 'hidden' : 'block'}`}>Admin Panel</h2>
                </div>
                <nav className="mt-4">
                    <div className={`px-4 mb-2 text-gray-400 text-xs uppercase font-semibold ${collapsed ? 'hidden' : 'block'}`}>Manajemen</div>
                    {menuItems.slice(0, 3).map(item => (
                        <Link
                            key={item.key}
                            to={item.path}
                            className={`flex items-center p-3 transition-colors duration-200 hover:bg-blue-700 rounded-lg shadow-sm ${collapsed ? 'justify-center' : ''} hover:shadow-md transform hover:scale-105`}
                            title={collapsed ? item.label : ''}
                        >
                            <span className={`text-lg ${collapsed ? 'block' : 'mr-2'} transition-transform duration-200 transform hover:scale-125`}>
                                {item.icon}
                            </span>
                            <span className={`${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                        </Link>
                    ))}
                    <div className={`px-4 mb-2 mt-4 text-gray-400 text-xs uppercase font-semibold ${collapsed ? 'hidden' : 'block'}`}>Laporan</div>
                    <Link
                        to={menuItems[3].path}
                        className={`flex items-center p-3 transition-colors duration-200 hover:bg-blue-700 rounded-lg shadow-sm ${collapsed ? 'justify-center' : ''} hover:shadow-md transform hover:scale-105`}
                        title={collapsed ? menuItems[3].label : ''}
                    >
                        <span className={`text-lg ${collapsed ? 'block' : 'mr-2'} transition-transform duration-200 transform hover:scale-125`}>
                            {menuItems[3].icon}
                        </span>
                        <span className={`${collapsed ? 'hidden' : 'block'}`}>{menuItems[3].label}</span>
                    </Link>
                </nav>
            </div>
            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between bg-white shadow-md p-4">
                    <button
                        className="text-gray-500 focus:outline-none"
                        onClick={toggle}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {collapsed ? '☰' : '✖'}
                    </button>
                    <button
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </header>
                <main className="flex-1 overflow-auto p-6 bg-gray-200">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
