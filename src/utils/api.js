// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Ganti dengan URL API Anda

export const fetchRevenueSummary = async () => {
    const response = await axios.get(`${API_URL}/revenue-summary/`);
    return response.data;
};

export const fetchDailySales = async () => {
    const response = await axios.get(`${API_URL}/daily-sales-chart/?days=30`);
    return response.data;
};

export const fetchTopSellingProducts = async () => {
    const response = await axios.get(`${API_URL}/top-selling-products/?limit=5`);
    return response.data;
};
