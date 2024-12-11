import React from 'react';
import { Table, Typography, Spin } from 'antd'; // Menggunakan komponen dari Ant Design


const TopSellingProducts = ({ data = [], loading = false }) => {
    // Jika loading, tampilkan indikator loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    // Mengatur kolom tabel
    const columns = [
        {
            title: 'Nama Produk',
            dataIndex: 'produk__nama',
            key: 'produk__nama',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Jumlah Terjual',
            dataIndex: 'jumlah_terjual',
            key: 'jumlah_terjual',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Total Pendapatan',
            dataIndex: 'total_pendapatan',
            key: 'total_pendapatan',
            render: (text) => (
                <Typography.Text>
                    Rp {text.toLocaleString()}
                </Typography.Text>
            ),
        },
    ];

    return (
        <div className="p-4">
            <Typography.Title level={4} className="mb-4 font-bold">
                Produk Terlaris
            </Typography.Title>
            <Table 
                dataSource={data} 
                columns={columns} 
                rowKey="produk__nama"
                pagination={false}
                className="rounded-lg shadow-lg"
                bordered
            />
            {data.length === 0 && (
                <div className="flex justify-center items-center mt-4">
                    <Typography.Text type="secondary">
                        Tidak ada data produk terlaris.
                    </Typography.Text>
                </div>
            )}
        </div>
    );
};

export default TopSellingProducts;
