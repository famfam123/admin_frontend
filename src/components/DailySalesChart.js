import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Card } from 'antd';
import { Typography } from 'antd';

// Register Chart.js components
ChartJS.register(...registerables);

const MinimalistLineChart = ({ data }) => {
    // Data default jika tidak ada data
    const defaultData = [
        { period: 'Jan', dataset1: 10, dataset2: 20, dataset3: 30, dataset4: 40 },
        { period: 'Feb', dataset1: 20, dataset2: 30, dataset3: 40, dataset4: 50 },
        { period: 'Mar', dataset1: 30, dataset2: 40, dataset3: 50, dataset4: 60 },
        { period: 'Apr', dataset1: 40, dataset2: 50, dataset3: 60, dataset4: 70 },
        { period: 'May', dataset1: 50, dataset2: 60, dataset3: 70, dataset4: 80 },
    ];

    const dataToUse = data && data.length > 0 ? data : defaultData;

    const chartData = {
        labels: dataToUse.map(item => item.period), // Periode
        datasets: [
            {
                label: 'Dataset 1',
                data: dataToUse.map(item => item.dataset1),
                borderColor: '#1f77b4',
                backgroundColor: 'rgba(0, 0, 0, 0)', // No fill
                borderWidth: 2,
                pointRadius: 5, // Ukuran titik data
                pointBackgroundColor: '#1f77b4',
                tension: 0.4, // Garis melengkung
            },
            {
                label: 'Dataset 2',
                data: dataToUse.map(item => item.dataset2),
                borderColor: '#ff7f0e',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: '#ff7f0e',
                tension: 0.4,
            },
            {
                label: 'Dataset 3',
                data: dataToUse.map(item => item.dataset3),
                borderColor: '#2ca02c',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: '#2ca02c',
                tension: 0.4,
            },
            {
                label: 'Dataset 4',
                data: dataToUse.map(item => item.dataset4),
                borderColor: '#d62728',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: '#d62728',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true, // Gunakan lingkaran kecil pada legenda
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hilangkan garis grid horizontal
                },
                title: {
                    display: true,
                    text: 'Periode',
                },
            },
            y: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Garis grid tipis
                },
                title: {
                    display: true,
                    text: 'Nilai',
                },
                beginAtZero: true,
            },
        },
        elements: {
            line: {
                borderJoinStyle: 'round',
            },
            point: {
                hoverRadius: 7,
            },
        },
    };

    return (
        <div className="flex justify-center p-4">
            <Card className="w-full max-w-6xl shadow-lg rounded-lg" bodyStyle={{ padding: '24px' }}>
                <Typography.Title level={4} className="text-center mb-6 font-semibold text-gray-700">
                    Sales Performance
                </Typography.Title>
                <div className="flex justify-center items-center">
                    <Line data={chartData} options={options} className="max-w-full h-auto" />
                </div>
            </Card>
        </div>
    );
};

export default MinimalistLineChart;
