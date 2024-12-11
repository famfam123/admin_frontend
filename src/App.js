// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material'; // Import CssBaseline from Material UI
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Reports from './pages/Reports';
import AppLayout from './components/AppLayout'; // Import AppLayout
import AddProduct from './pages/AddProduct';

const App = () => {
    return (
        <div>
            {/* Use CssBaseline for consistent styling across browsers */}
            <CssBaseline />
            <Router>
                <Routes>
                    {/* Route for login, no layout needed */}
                    <Route path="/" element={<Login />} />
                    
                    {/* Routes that require layout */}
                    <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                    <Route path="/users" element={<AppLayout><Users /></AppLayout>} />
                    <Route path="/products" element={<AppLayout><Products /></AppLayout>} />
                    <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />
                    <Route path="/admin/produk/tambah" element={<AppLayout><AddProduct /></AppLayout>} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
