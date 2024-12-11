import React from "react";
import { Card, Row, Col } from "antd";
import { ShoppingCartOutlined, DollarOutlined, TeamOutlined, RiseOutlined } from "@ant-design/icons";

const RevenueComparison = ({ data }) => {
    if (!data) {
        return <Card>Data tidak tersedia</Card>;
    }

    const cardStyle = {
        borderRadius: "8px",
        padding: "16px",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const iconStyle = (bgColor) => ({
        fontSize: "24px",
        padding: "12px",
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: "#fff",
    });

    const valueStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        margin: 0,
    };

    const labelStyle = {
        fontSize: "14px",
        color: "#ddd",
        margin: 0,
    };

    // Fungsi untuk memformat nilai sebagai mata uang
    const formatCurrency = (value) => {
        if (value === "N/A" || value === undefined || value === null) {
            return "Tidak Tersedia";
        }
        return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
    };

    const cardsData = [
        {
            title: "Hari Ini",
            value: formatCurrency(data?.today),
            icon: <ShoppingCartOutlined style={iconStyle("#f56c6c")} />, // Warna merah muda untuk ikon
            bgColor: "#f56c6c", // Warna merah muda untuk latar kartu
        },
        {
            title: "Kemarin",
            value: formatCurrency(data?.yesterday),
            icon: <DollarOutlined style={iconStyle("#409EFF")} />, // Warna biru untuk ikon
            bgColor: "#409EFF", // Warna biru untuk latar kartu
        },
        {
            title: "Perubahan",
            value: formatCurrency(data?.difference),
            icon: <TeamOutlined style={iconStyle("#67C23A")} />, // Warna hijau untuk ikon
            bgColor: "#67C23A", // Warna hijau untuk latar kartu
        },
        {
            title: "Persentase Perubahan",
            value: data?.percentage_change === "N/A" ? "Tidak Tersedia" : `${data?.percentage_change}%`,
            icon: <RiseOutlined style={iconStyle("#E6A23C")} />, // Warna kuning untuk ikon
            bgColor: "#E6A23C", // Warna kuning untuk latar kartu
        },
    ];

    return (
        <Row gutter={[16, 16]}>
            {cardsData.map((card, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                    <Card
                        style={{
                            ...cardStyle,
                            backgroundColor: card.bgColor,
                        }}
                    >
                        <div>{card.icon}</div>
                        <div>
                            <p style={labelStyle}>{card.title}</p>
                            <p style={valueStyle}>{card.value}</p>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default RevenueComparison;
