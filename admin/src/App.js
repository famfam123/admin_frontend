// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // Pastikan ini adalah jalur yang benar
import Dashboard from './pages/Dashboard'; // Pastikan ini adalah jalur yang benar
import Users from './pages/Users'; // Impor komponen Users
import Products from './pages/Products'; // Impor komponen Products
import Reports from './pages/Reports'; // Impor komponen Reports
import AppLayout from './components/AppLayout'; // Impor komponen AppLayout
import AddProduct from './pages/AddProduct'; // Impor komponen AddProduct

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <AppLayout>
                            <Dashboard />
                        </AppLayout>
                    } 
                />
                <Route 
                    path="/users" 
                    element={
                        <AppLayout>
                            <Users />
                        </AppLayout>
                    } 
                />
                <Route 
                    path="/products" 
                    element={
                        <AppLayout>
                            <Products />
                        </AppLayout>
                    } 
                />
                <Route 
                    path="/reports" 
                    element={
                        <AppLayout>
                            <Reports />
                        </AppLayout>
                    } 
                />
                {/* Tambahkan route untuk halaman AddProduct */}
                <Route 
                    path="/admin/produk/tambah" 
                    element={
                        <AppLayout>
                            <AddProduct />
                        </AppLayout>
                    } 
                />
            </Routes>
        </Router>
    );
};

export default App;
