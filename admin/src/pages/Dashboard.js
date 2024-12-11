import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spin, Alert } from 'antd'; // Menggunakan komponen dari Ant Design
import ContentWrapper from '../components/ContentWrapper';
import RevenueSummaryChart from '../components/RevenueSummaryChart';
import DailySalesChart from '../components/DailySalesChart';
import TopSellingProducts from '../components/TopSellingProducts';
import axiosInstance from '../utils/axiosConfig';

const Dashboard = () => {
    const [revenueData, setRevenueData] = useState([]);
    const [dailySalesData, setDailySalesData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeFrame, setTimeFrame] = useState('daily'); // Pilihan default

    useEffect(() => {
        const loadData = async () => {
            try {
                const revenue = await axiosInstance.get('/revenue-summary');
                const topSelling = await axiosInstance.get('/top-products');

                setRevenueData(revenue.data);
                setTopProducts(topSelling.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const loadDailySalesData = async () => {
            try {
                const dailySales = await axiosInstance.get(`/daily-sales?timeFrame=${timeFrame}`);
                setDailySalesData(dailySales.data);
            } catch (error) {
                console.error("Error fetching daily sales data: ", error);
                setError("Gagal memuat data penjualan harian. Silakan coba lagi nanti.");
            }
        };

        if (!loading) {
            loadDailySalesData();
        }
    }, [timeFrame, loading]); // Memuat ulang data penjualan harian saat timeFrame berubah

    if (loading) {
        return <Spin size="large" />; // Menampilkan spinner loading dari Ant Design
    }

    if (error) {
        return <Alert message={error} type="error" showIcon />;
    }

    return (
        <ContentWrapper title="Dashboard">
            <Row gutter={16}>
                <Col span={24}>
                    <div className="mb-6">
                        <RevenueSummaryChart data={revenueData} />
                    </div>
                </Col>

                {/* Kontrol untuk memilih timeframe */}
                <Col span={24} className="mb-4">
                    <Button 
                        type={timeFrame === 'daily' ? 'primary' : 'default'} 
                        onClick={() => setTimeFrame('daily')} 
                        className="mr-2"
                    >
                        Harian
                    </Button>
                    <Button 
                        type={timeFrame === 'monthly' ? 'primary' : 'default'} 
                        onClick={() => setTimeFrame('monthly')} 
                        className="mr-2"
                    >
                        Bulanan
                    </Button>
                    <Button 
                        type={timeFrame === 'yearly' ? 'primary' : 'default'} 
                        onClick={() => setTimeFrame('yearly')} 
                    >
                        Tahunan
                    </Button>
                </Col>

                <Col xs={24} sm={12}>
                    <DailySalesChart data={dailySalesData} />
                </Col>

                <Col xs={24} sm={12}>
                    <TopSellingProducts data={topProducts} />
                </Col>
            </Row>
        </ContentWrapper>
    );
};

export default Dashboard;
