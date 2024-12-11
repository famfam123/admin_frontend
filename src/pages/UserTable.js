import React from 'react';
import { FaTrash, FaEdit, FaKey } from 'react-icons/fa';

const UserTable = ({ users, loading, onDeleteUser, onToggleActive, onResetPassword }) => {
  if (loading)
    return <p className="text-center text-gray-600 animate-pulse">Memuat data...</p>;
  if (users.length === 0)
    return <p className="text-center text-gray-600">Tidak ada data pengguna.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-left">
          <tr>
            <th className="px-4 py-3 border-b">#</th>
            <th className="px-4 py-3 border-b">Nama Lengkap</th>
            <th className="px-4 py-3 border-b">Email</th>
            <th className="px-4 py-3 border-b">Role</th>
            <th className="px-4 py-3 border-b">Status</th>
            <th className="px-4 py-3 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 transition duration-150 border-b"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-semibold text-gray-800">{user.full_name}</td>
              <td className="px-4 py-3 text-gray-600">{user.email}</td>
              <td className="px-4 py-3 capitalize text-gray-600">{user.role}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    user.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {user.is_active ? 'Aktif' : 'Nonaktif'}
                </span>
              </td>
              <td className="px-4 py-3 space-x-2 flex">
                <button
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-white text-sm ${
                    user.is_active ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
                  }`}
                  onClick={() => onToggleActive(user.id)}
                  aria-label={`Toggle status for ${user.full_name}`}
                >
                  <FaEdit aria-hidden="true" />
                  <span>{user.is_active ? 'Nonaktifkan' : 'Aktifkan'}</span>
                </button>
                <button
                  className="flex items-center space-x-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                  onClick={() => onDeleteUser(user.id)}
                  aria-label={`Delete user ${user.full_name}`}
                >
                  <FaTrash aria-hidden="true" />
                  <span>Hapus</span>
                </button>
                <button
                  className="flex items-center space-x-1 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm"
                  onClick={() => onResetPassword(user.email)}
                  aria-label={`Reset password for ${user.full_name}`}
                >
                  <FaKey aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Menampilkan {users.length} pengguna
        </p>
      </div>
    </div>
  );
};

export default UserTable;
