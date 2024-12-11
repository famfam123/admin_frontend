import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { Link } from 'react-router-dom';
import { Modal, Box, Button, TextField, IconButton, CircularProgress } from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material'; // For search icon
import Swal from 'sweetalert2';

// Utility function to format numbers to Rupiah currency
const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

// Define modalStyle
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [productData, setProductData] = useState({
        kode: '',
        nama: '',
        harga_umum: '',
        harga_khusus: '',
        stok: '',
        kategori: '',
    });
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('produk/');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Gagal memuat produk', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        const filtered = products.filter(product =>
            product.nama.toLowerCase().includes(e.target.value.toLowerCase()) ||
            product.kode.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleOpenEdit = (product) => {
        setSelectedProduct(product);
        setProductData(product);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => setOpenEdit(false);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitEdit = async () => {
        try {
            await axiosInstance.put(`produk/${selectedProduct.id}/`, productData);
            setProducts(products.map(product => (product.id === selectedProduct.id ? productData : product)));
            setFilteredProducts(filteredProducts.map(product => (product.id === selectedProduct.id ? productData : product)));
            handleCloseEdit();
            Swal.fire('Berhasil!', 'Produk telah diperbarui.', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal memperbarui produk', 'error');
        }
    };

    const handleSubmitAdd = async () => {
        try {
            const response = await axiosInstance.post('produk/', productData);
            setProducts([...products, response.data]);
            setFilteredProducts([...filteredProducts, response.data]);
            handleCloseAdd();
            Swal.fire('Berhasil!', 'Produk telah ditambahkan.', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal menambahkan produk', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: 'Produk ini akan dihapus!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
            try {
                await axiosInstance.delete(`produk/${id}/`);
                setProducts(products.filter(product => product.id !== id));
                setFilteredProducts(filteredProducts.filter(product => product.id !== id));
                Swal.fire('Berhasil!', 'Produk telah dihapus.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Gagal menghapus produk', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="p-8 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Daftar Produk</h2>
                <Button
                    onClick={() => setOpenAdd(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center shadow-md transition duration-300"
                >
                    <Add className="mr-2" /> Tambah Produk
                </Button>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <TextField
                    variant="outlined"
                    placeholder="Cari Produk..."
                    value={searchQuery}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    className="w-full max-w-md shadow-md bg-white rounded-lg"
                />
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Kode</th>
                            <th className="px-6 py-3 text-left">Nama</th>
                            <th className="px-6 py-3 text-left">Harga Umum</th>
                            <th className="px-6 py-3 text-left">Harga Khusus</th>
                            <th className="px-6 py-3 text-left">Stok</th>
                            <th className="px-6 py-3 text-left">Kategori</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <tr key={product.id} className="border-b hover:bg-gray-50 transition duration-300">
                                    <td className="px-6 py-4">{product.kode}</td>
                                    <td className="px-6 py-4">{product.nama}</td>
                                    <td className="px-6 py-4">{formatRupiah(product.harga_umum)}</td>
                                    <td className="px-6 py-4">{formatRupiah(product.harga_khusus)}</td>
                                    <td className="px-6 py-4">{product.stok}</td>
                                    <td className="px-6 py-4">{product.kategori}</td>
                                    <td className="px-6 py-4 text-center">
                                        <IconButton onClick={() => handleOpenEdit(product)} className="text-blue-600 hover:text-blue-800">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">
                                            <Delete />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center px-6 py-4 text-gray-600">Produk tidak ditemukan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal untuk Edit Produk */}
            <Modal open={openEdit} onClose={handleCloseEdit}>
                <Box sx={modalStyle} className="rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Edit Produk</h2>
                    <form className="space-y-4">
                        <TextField
                            label="Kode"
                            name="kode"
                            value={productData.kode}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Nama"
                            name="nama"
                            value={productData.nama}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Harga Umum"
                            name="harga_umum"
                            value={productData.harga_umum}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="Harga Khusus"
                            name="harga_khusus"
                            value={productData.harga_khusus}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="Stok"
                            name="stok"
                            value={productData.stok}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="Kategori"
                            name="kategori"
                            value={productData.kategori}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <div className="flex justify-between">
                            <Button variant="outlined" color="error" onClick={handleCloseEdit}>
                                Batal
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSubmitEdit}>
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>

            {/* Modal untuk Tambah Produk */}
            <Modal open={openAdd} onClose={handleCloseAdd}>
                <Box sx={modalStyle} className="rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Tambah Produk</h2>
                    <form className="space-y-4">
                        <TextField
                            label="Kode"
                            name="kode"
                            value={productData.kode}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Nama"
                            name="nama"
                            value={productData.nama}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Harga Umum"
                            name="harga_umum"
                            value={productData.harga_umum}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="Harga Khusus"
                            name="harga_khusus"
                            value={productData.harga_khusus}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="Stok"
                            name="stok"
                            value={productData.stok}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type="number"
                        />
                        <TextField
                            label="Kategori"
                            name="kategori"
                            value={productData.kategori}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                        <div className="flex justify-between">
                            <Button variant="outlined" color="error" onClick={handleCloseAdd}>
                                Batal
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSubmitAdd}>
                                Tambah
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductList;
