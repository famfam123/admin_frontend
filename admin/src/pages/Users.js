import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Delete, LockOpen, Lock, LockReset } from '@mui/icons-material'; // Removed Edit as it's unused
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('petugas'); // Default role is petugas
    const [password, setPassword] = useState('');
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch Users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('users/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []); // Ensure any dependencies are properly included

    // Toggle Active Status
    const handleToggleActive = async (userId) => {
        const user = users.find(user => user.id === userId);
        const newStatus = !user.is_active;

        const result = await Swal.fire({
            title: `Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, proceed!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.post(`users/${userId}/toggle-active/`);
                setUsers(users.map(user => user.id === userId ? { ...user, is_active: newStatus } : user));
                Swal.fire('Success!', `User has been ${newStatus ? 'activated' : 'deactivated'}.`, 'success');
            } catch (error) {
                console.error('Error toggling user active status:', error);
                Swal.fire('Error!', 'Failed to update user status.', 'error');
            }
        }
    };

    // Delete User
    const handleDeleteUser = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`users/${userId}/delete/`);
                setUsers(users.filter(user => user.id !== userId));
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire('Error!', 'Failed to delete user.', 'error');
            }
        }
    };

    // Create User
    const handleSubmitUserCreate = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message
        try {
            await axiosInstance.post('users/create/', {
                email,
                full_name: fullName,
                role, // Only 'petugas' can be assigned
                password,
            });
            Swal.fire('Success!', 'User created successfully!', 'success');
            setEmail('');
            setFullName('');
            setRole('petugas'); // Reset to petugas
            setPassword('');
            setOpenCreateModal(false);
        } catch (error) {
            setErrorMessage('Failed to create user. Please try again.'); // Set error message
            console.error('Error creating user:', error);
            Swal.fire('Error!', 'Failed to create user. Please try again.', 'error');
        }
    };

    // Reset Password
    const handlePasswordReset = async (email) => {
        const result = await Swal.fire({
            title: 'Send Password Reset Link?',
            text: `Are you sure you want to send a password reset link to ${email}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, send it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.post('password-reset/', { email });
                Swal.fire('Success!', 'Password reset link sent!', 'success');
            } catch (error) {
                console.error('Error sending password reset link:', error);
                Swal.fire('Error!', 'Failed to send password reset link.', 'error');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <motion.h2 
                className="text-4xl font-extrabold text-gray-800 mb-8" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                User Management
            </motion.h2>

            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={() => setOpenCreateModal(true)}
                sx={{ mb: 3 }}
            >
                Create User
            </Button>

            {/* Modal Create User */}
            {openCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h3 className="text-2xl font-semibold mb-4">Create User</h3>
                        <form onSubmit={handleSubmitUserCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="petugas">Petugas</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} {/* Error message display */}
                            <div className="flex justify-end space-x-4">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setOpenCreateModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Create User
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* User Table */}
            <TableContainer component={Paper} className="mt-4">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.full_name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.is_active ? 'Active' : 'Inactive'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleToggleActive(user.id)}>
                                        {user.is_active ? <Lock /> : <LockOpen />}
                                    </IconButton>
                                    <IconButton onClick={() => handlePasswordReset(user.email)}>
                                        <LockReset />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserManagement;
