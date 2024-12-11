import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import UserTable from './UserTable';
import UserForm from './UserForm';
import Swal from 'sweetalert2';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/?page=${page}`);
      setUsers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 5)); // Assuming 10 items per page
    } catch (err) {
      setError('Gagal memuat data pengguna');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleAddUser = async (userData) => {
    try {
      await axiosInstance.post('/users/create/', userData);
      Swal.fire('Berhasil', 'Pengguna berhasil ditambahkan', 'success');
      fetchUsers(currentPage);
      setIsModalOpen(false);
    } catch (err) {
      Swal.fire('Gagal', 'Gagal menambahkan pengguna', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Pengguna akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/users/${userId}/delete/`);
          Swal.fire('Berhasil', 'Pengguna berhasil dihapus', 'success');
          fetchUsers(currentPage);
        } catch (err) {
          Swal.fire('Gagal', 'Gagal menghapus pengguna', 'error');
        }
      }
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Manajemen Pengguna</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <button
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
        onClick={toggleModal}
      >
        + Tambah Pengguna
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={toggleModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tambah Pengguna</h2>
            <UserForm onAddUser={handleAddUser} />
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 w-full"
              onClick={toggleModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <UserTable
        users={users}
        loading={loading}
        onDeleteUser={handleDeleteUser}
      />

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? 'bg-gray-300 text-gray-400' : 'bg-gray-800 text-white'
          }`}
        >
          Prev
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-400' : 'bg-gray-800 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
