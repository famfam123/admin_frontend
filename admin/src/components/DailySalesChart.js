// src/components/DailySalesChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Card } from 'antd';
import { Typography } from 'antd';

// Register Chart.js components
ChartJS.register(...registerables);

const DailySalesChart = ({ data }) => {
    // Ensure data is valid and check if `data` prop is defined and has the correct structure
    if (!data || data.length === 0) {
        return <Typography.Title level={5} className="text-center mt-4">No data available</Typography.Title>;
    }

    // Map data to create labels and datasets
    const chartData = {
        labels: data.map(item => item.tanggal || item.week || item.bulan), // Tanggal, Minggu, atau Bulan
        datasets: [
            {
                type: 'bar', // Dataset pertama sebagai grafik batang
                label: 'Total Penjualan (Bar)',
                data: data.map(item => item.total_penjualan || 0), // Total Penjualan untuk setiap periode
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // Blue for bars
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                type: 'line', // Dataset kedua sebagai garis
                label: 'Total Penjualan (Line)',
                data: data.map(item => item.total_penjualan || 0), // Data yang sama untuk garis
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Soft red for line area
                borderColor: 'rgba(255, 99, 132, 1)', // Red for line
                borderWidth: 2,
                fill: false, // Tidak mengisi area di bawah garis
                tension: 0.4, // Membuat garis sedikit melengkung
            },
        ],
    };

    // Define chart options
    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Periode',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Penjualan (Rp)',
                },
            },
        },
    };

    return (
        <div className="flex justify-center p-4">
            <Card className="w-full max-w-6xl shadow-lg rounded-lg" bodyStyle={{ padding: '24px' }}>
                <Typography.Title level={4} className="text-center mb-6 font-semibold text-gray-700">
                    Grafik Penjualan (Bar + Line)
                </Typography.Title>
                <div className="flex justify-center items-center">
                    <Bar data={chartData} options={options} className="max-w-full h-auto" />
                </div>
            </Card>
        </div>
    );
};

export default DailySalesChart;
