import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert } from 'antd';
import ContentWrapper from '../components/ContentWrapper';
import DailySalesChart from '../components/DailySalesChart';
import TopSellingProducts from '../components/TopSellingProducts';
import RevenueComparison from '../components/RevenueComparison';

import axiosInstance from '../utils/axiosConfig';

const Dashboard = () => {
    const [dailySales, setDailySales] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [revenueComparison, setRevenueComparison] = useState({});
    const [error, setError] = useState(null);
    const [timeFrame, setTimeFrame] = useState('daily');

    // Fetch Daily Sales
    const fetchDailySales = async () => {
        try {
            const response = await axiosInstance.get('/daily-sales/', {
                params: { period: timeFrame, days: 30 },
            });
            setDailySales(response.data);
        } catch (err) {
            setError('Gagal memuat data penjualan harian.');
        }
    };

    // Fetch Revenue Comparison
    const fetchRevenueComparison = async () => {
        try {
            const response = await axiosInstance.get('/revenue-comparison/');
            setRevenueComparison(response.data);
        } catch (err) {
            setError('Gagal memuat perbandingan pendapatan.');
        }
    };

    // Fetch Top Selling Products
    const fetchTopProducts = async () => {
        try {
            const response = await axiosInstance.get('/top-products/', {
                params: { period: timeFrame },
            });
            setTopProducts(response.data);
        } catch (err) {
            setError('Gagal memuat produk terlaris.');
        }
    };

    // Load all data when component mounts or timeFrame changes
    useEffect(() => {
        const loadData = async () => {
            setError(null); // Reset error before making new requests

            try {
                await Promise.all([
                    fetchDailySales(),
                    fetchRevenueComparison(),
                    fetchTopProducts(),
                ]);
            } catch (err) {
                setError('Terjadi kesalahan saat memuat data.');
            }
        };

        loadData();
    }, [timeFrame]); // Dependency on timeFrame, rerun when timeFrame changes

    return (
        <ContentWrapper>
            {error && <Alert message={error} type="error" showIcon />}
            
            {!error && (
                <>
                    <Row gutter={16} style={{ marginTop: '20px' }}>
                        {/* Revenue Comparison moved to the top */}
                        <Col xs={24}>
                            <RevenueComparison data={revenueComparison} />
                        </Col>
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
                            <DailySalesChart data={dailySales} />
                        </Col>
                        <Col xs={24} sm={12}>
                            <TopSellingProducts data={topProducts} />
                        </Col>
                    </Row>
                </>
            )}
        </ContentWrapper>
    );
};

export default Dashboard;
