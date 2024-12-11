import React from "react";
import { Typography, Spin } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopSellingProducts = ({ data = [], loading = false }) => {
    const colors = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
    ]; // Warna untuk grafik

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    const defaultData = [
        {
            produk__nama: "Tidak Ada Data",
            total_pendapatan: 1,
        },
    ];

    const displayData = data.length > 0 ? data : defaultData;

    const chartData = {
        labels: displayData.map((item) => item.produk__nama),
        datasets: [
            {
                data: displayData.map((item) => item.total_pendapatan),
                backgroundColor: displayData.length > 1 ? colors : ["#d3d3d3"],
                hoverBackgroundColor: colors.map((color) =>
                    color.replace("FF", "AA") // Hover efek lebih lembut
                ),
                borderWidth: 1,
                borderColor: "#fff",
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                backgroundColor: "#fff",
                titleColor: "#333",
                bodyColor: "#666",
                borderColor: "#ddd",
                borderWidth: 1,
                cornerRadius: 4,
            },
        },
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: "easeOutBounce",
        },
    };

    return (
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <Typography.Title
                level={4}
                className="mb-4 text-center font-bold text-blue-800"
            >
                🔥 Produk Terlaris
            </Typography.Title>
            <div className="h-64">
                <Pie data={chartData} options={chartOptions} />
            </div>
            {data.length === 0 && (
                <div className="flex justify-center items-center mt-4">
                    <Typography.Text type="secondary" className="italic text-gray-500">
                        Tidak ada data produk terlaris untuk periode ini.
                    </Typography.Text>
                </div>
            )}
        </div>
    );
};

export default TopSellingProducts;
