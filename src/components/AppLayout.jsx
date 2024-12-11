// src/components/AppLayout.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            {/* Sidebar */}
            <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isExpanded ? 'ml-64' : 'ml-20'
                }`}
            >
                {/* Header */}
                <Header isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

                {/* Main Content */}
                <main className="flex-1 p-6 mt-16 bg-gray-100">
                    <div className="bg-white rounded-lg p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
