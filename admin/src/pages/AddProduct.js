// src/pages/AddProduct.js
import React, { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline'; // Gunakan jalur ini untuk v2

const AddProduct = () => {
    const [productData, setProductData] = useState({
        kode: '',
        nama: '',
        harga_umum: '',
        harga_khusus: '',
        stok: '',
        kategori: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('produk/', productData); // Mengirimkan produk baru ke API
            navigate('/admin/produk'); // Redirect ke halaman daftar produk
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <div className="flex items-center mb-6">
                    <PlusCircleIcon className="h-6 w-6 text-blue-600 mr-2" />
                    <h2 className="text-2xl font-bold">Tambah Produk Baru</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kode Produk:</label>
                        <input
                            type="text"
                            name="kode"
                            value={productData.kode}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama Produk:</label>
                        <input
                            type="text"
                            name="nama"
                            value={productData.nama}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Harga Umum:</label>
                        <input
                            type="number"
                            name="harga_umum"
                            value={productData.harga_umum}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Harga Khusus:</label>
                        <input
                            type="number"
                            name="harga_khusus"
                            value={productData.harga_khusus}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Stok:</label>
                        <input
                            type="number"
                            name="stok"
                            value={productData.stok}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kategori:</label>
                        <input
                            type="text"
                            name="kategori"
                            value={productData.kategori}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold rounded-md p-2 hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                    >
                        <PlusCircleIcon className="h-5 w-5 mr-2" />
                        Tambah Produk
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
