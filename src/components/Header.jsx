import React from 'react';
import { Dropdown, Menu } from 'antd';
import { FiLogOut } from 'react-icons/fi';
import { DownOutlined } from '@ant-design/icons';
import NotificationDropdown from './NotificationDropdown'; // Import komponen notifikasi

const Header = ({ isExpanded }) => {
    return (
        <div
            className={`bg-white shadow fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
                isExpanded ? 'pl-64' : 'pl-20'
            } flex items-center justify-between h-16 px-6`}
        >
            <div className="flex items-center space-x-4 ml-auto">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring"
                />

                {/* Komponen Notifikasi */}
                <NotificationDropdown />

                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>

                {/* Logout Dropdown */}
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item key="1">
                                <a href="/logout" className="flex items-center text-red-600">
                                    <FiLogOut className="text-xl mr-2" /> Logout
                                </a>
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <a onClick={(e) => e.preventDefault()} className="flex items-center space-x-2 cursor-pointer">
                        <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
