import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const UserForm = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'petugas',
    password: '',
    confirm_password: '',
    is_staff: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }
    onAddUser(formData); // Memanggil fungsi untuk menambahkan pengguna
  };

  const handleCancel = () => {
    setFormData({
      full_name: '',
      email: '',
      role: 'petugas',
      password: '',
      confirm_password: '',
      is_staff: false,
    }); // Atur ulang formulir
    if (onCancel) {
      onCancel(); // Panggil onCancel jika disediakan
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Pengguna Baru</h2>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Nama Lengkap</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="flex-1 focus:outline-none"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaEnvelope className="text-gray-500 mr-2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 focus:outline-none"
            placeholder="Masukkan email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="petugas">Petugas</option>
          <option value="admin" disabled>
            Admin (Tidak tersedia)
          </option>
        </select>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="flex-1 focus:outline-none"
            placeholder="Masukkan password"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Konfirmasi Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="flex-1 focus:outline-none"
            placeholder="Konfirmasi password"
            required
          />
        </div>
      </div>

      <div>
        <label className="flex items-center text-gray-600">
          <input
            type="checkbox"
            name="is_staff"
            checked={formData.is_staff}
            onChange={handleChange}
            className="mr-2 focus:ring-2 focus:ring-blue-500"
          />
          Admin (Status pengguna sebagai admin)
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Tambah Pengguna
        </button>
      </div>
    </form>
  );
};

export default UserForm;
