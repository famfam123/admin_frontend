import React, { useState, useEffect } from 'react';
import { Dropdown, Menu, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axiosConfig'; // Gunakan axios instance

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // Ambil notifikasi dari API saat komponen dimuat
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get('/notifications/');
                setNotifications(response.data);
                setUnreadCount(response.data.filter(notification => !notification.is_read).length);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    // Tandai semua notifikasi sebagai sudah dibaca
    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({
            ...notification,
            is_read: true,
        })));
        setUnreadCount(0);
    };

    // Menu dropdown untuk notifikasi
    const notificationMenu = (
        <Menu>
            {notifications.length > 0 ? (
                notifications.map(notification => (
                    <Menu.Item key={notification.id} className={notification.is_read ? '' : 'bg-gray-100'}>
                        <div>
                            <strong>{notification.title}</strong>
                            <p>{notification.message}</p>
                        </div>
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-notifications">
                    <div>Tidak ada notifikasi baru</div>
                </Menu.Item>
            )}
            <Menu.Item key="mark-all-read" onClick={markAllAsRead}>
                Tandai Semua Sebagai Dibaca
            </Menu.Item>
        </Menu>
    );

    return (
        <Badge count={unreadCount} showZero>
            <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
                <BellOutlined className="text-xl cursor-pointer" />
            </Dropdown>
        </Badge>
    );
};

export default NotificationDropdown;
