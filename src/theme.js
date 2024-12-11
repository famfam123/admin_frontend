import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material'; // Import ThemeProvider and CssBaseline
import { darkTheme, lightTheme } from './theme'; // Import themes
import Login from './pages/Login'; 
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Reports from './pages/Reports';
import AppLayout from './components/AppLayout';
import AddProduct from './pages/AddProduct';

const App = () => {
    // State to track dark mode
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode) {
            setIsDarkMode(savedMode === 'true');
        }
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Log themes to check if they are defined properly
    console.log('Dark Theme:', darkTheme);
    console.log('Light Theme:', lightTheme);

    return (
        <div>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <CssBaseline /> 
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route 
                            path="/dashboard" 
                            element={<AppLayout><Dashboard /></AppLayout>} 
                        />
                        <Route 
                            path="/users" 
                            element={<AppLayout><Users /></AppLayout>} 
                        />
                        <Route 
                            path="/products" 
                            element={<AppLayout><Products /></AppLayout>} 
                        />
                        <Route 
                            path="/reports" 
                            element={<AppLayout><Reports /></AppLayout>} 
                        />
                        <Route 
                            path="/admin/produk/tambah" 
                            element={<AppLayout><AddProduct /></AppLayout>} 
                        />
                    </Routes>
                </Router>

                <button
                    onClick={toggleTheme}
                    className="p-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 fixed top-4 right-4"
                >
                    Ubah Tema (Sekarang: {isDarkMode ? 'Gelap' : 'Terang'})
                </button>
            </ThemeProvider>
        </div>
    );
};

export default App;
