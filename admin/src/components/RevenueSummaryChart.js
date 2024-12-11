import React from 'react';
import { Card, Col, Row, Typography } from 'antd'; // Menggunakan komponen dari Ant Design
import { AttachMoney, TrendingUp, TrendingDown } from '@mui/icons-material';

const { Title, Text } = Typography;

const RevenueSummaryChart = ({ data }) => {
    // Mendapatkan tanggal hari ini dan kemarin dalam format yang sama
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const formatDate = (date) => date.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Mengambil pendapatan hari ini dan kemarin
    const todayData = data.find(item => item.tanggal === formatDate(today));
    const yesterdayData = data.find(item => item.tanggal === formatDate(yesterday));

    const todayRevenue = todayData ? todayData.total_harga : 0;
    const yesterdayRevenue = yesterdayData ? yesterdayData.total_harga : 0;

    // Memperbaiki perhitungan persentase kenaikan
    const percentageIncrease = (yesterdayRevenue === 0 && todayRevenue === 0) 
        ? 0 
        : yesterdayRevenue > 0 
        ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
        : 100; // Jika kemarin tidak ada pendapatan dan hari ini ada

    // Fungsi untuk format rupiah
    const formatRupiah = (amount) => {
        return `Rp ${amount.toLocaleString('id-ID')}`; // Format untuk ID
    };

    return (
        <Row gutter={16} className="p-4">
            <Col xs={24} sm={12} md={8}>
                <Card className="bg-blue-600 text-white shadow-lg transition-transform transform hover:scale-105">
                    <div className="flex items-center">
                        <AttachMoney fontSize="large" className="mr-2" />
                        <Title level={4} className="text-white mb-0">
                            Pendapatan Hari Ini
                        </Title>
                    </div>
                    <Text className="text-white text-lg font-bold mt-2">{formatRupiah(todayRevenue)}</Text>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <Card className="bg-green-600 text-white shadow-lg transition-transform transform hover:scale-105">
                    <div className="flex items-center">
                        <AttachMoney fontSize="large" className="mr-2" />
                        <Title level={4} className="text-white mb-0">
                            Pendapatan Kemarin
                        </Title>
                    </div>
                    <Text className="text-white text-lg font-bold mt-2">{formatRupiah(yesterdayRevenue)}</Text>
                </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <Card className="bg-orange-600 text-white shadow-lg transition-transform transform hover:scale-105">
                    <div className="flex items-center">
                        {percentageIncrease > 0 ? (
                            <TrendingUp fontSize="large" className="mr-2 text-white" />
                        ) : (
                            <TrendingDown fontSize="large" className="mr-2 text-white" />
                        )}
                        <Title level={4} className="text-white mb-0">
                            Persentase Kenaikan
                        </Title>
                    </div>
                    <Text className="text-white text-lg font-bold mt-2">{percentageIncrease.toFixed(2)}%</Text>
                </Card>
            </Col>
        </Row>
    );
};

export default RevenueSummaryChart;
