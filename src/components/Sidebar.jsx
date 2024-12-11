// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineUser, AiOutlineTags, AiOutlineFileText } from 'react-icons/ai';
import { Tooltip } from 'antd';
import logo from './logo.jpg'; // Sesuaikan path logo

const Sidebar = ({ isExpanded, toggleSidebar }) => {
    const menuItems = [
        { key: '1', label: 'Dashboard', path: '/dashboard', icon: <AiOutlineDashboard /> },
        { key: '2', label: 'Users', path: '/users', icon: <AiOutlineUser /> },
        { key: '3', label: 'Products', path: '/products', icon: <AiOutlineTags /> },
        { key: '4', label: 'Reports', path: '/reports', icon: <AiOutlineFileText /> },
    ];

    return (
        <div
            className={`bg-white shadow-lg border-r fixed left-0 top-0 bottom-0 z-20 transition-all duration-300 ease-in-out ${isExpanded ? 'w-56' : 'w-20'}`} // Reduced width to 'w-56'
        >
            {/* Logo and Sidebar Toggle */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-3">
                    {/* Logo */}
                    <div
                        className={`transition-all duration-300 ease-in-out ${isExpanded ? 'w-16 h-16' : 'w-12 h-12'}`}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className="rounded-full border shadow-lg object-cover transition-transform duration-300"
                        />
                    </div>
                    {isExpanded && (
                        <span className="ml-2 text-lg font-bold text-gray-800">HABIB KOMPUTER</span>
                    )}
                </div>
                <button
                    onClick={toggleSidebar}
                    className="text-gray-600 focus:outline-none transform transition-transform hover:scale-110"
                >
                    {isExpanded ? '<' : '>'}
                </button>
            </div>

            {/* Menu */}
            <nav className="mt-6 flex flex-col items-center space-y-2">
                {menuItems.map(item => (
                    <Tooltip title={!isExpanded ? item.label : ''} placement="right" key={item.key}>
                        <Link
                            to={item.path}
                            className={`flex items-center p-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ${
                                isExpanded ? 'w-full justify-start' : 'justify-center'  // Ensure icons are centered
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isExpanded && <span className="ml-4 text-sm font-medium">{item.label}</span>}
                        </Link>
                    </Tooltip>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
