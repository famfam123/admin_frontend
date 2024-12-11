import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { AttachMoney } from '@mui/icons-material';

const { Title } = Typography;

const RevenueSummaryChart = ({ data }) => {
    // Mendapatkan tanggal hari ini
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Mengambil pendapatan hari ini
    const todayData = data.find(item => item.tanggal === formatDate(today));
    // const todayRevenue = todayData ? todayData.total_harga : 0; // Menghapus total pendapatan

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
                    {/* Menghapus tampilan total pendapatan */}
                    {/* <Text className="text-white text-lg font-bold mt-2">{formatRupiah(todayRevenue)}</Text> */}
                </Card>
            </Col>
        </Row>
    );
};

export default RevenueSummaryChart;
