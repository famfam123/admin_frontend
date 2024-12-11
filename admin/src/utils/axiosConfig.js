import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/', // Sesuaikan dengan URL API Anda
});

// Interceptor untuk menambahkan token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani kesalahan
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response } = error;

        // Jika token kedaluwarsa (401 Unauthorized)
        if (response && response.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    // Coba untuk mendapatkan access token baru dengan refresh token
                    const { data } = await axios.post('http://localhost:8000/api/token/refresh/', {
                        refresh: refreshToken,
                    });
                    localStorage.setItem('accessToken', data.access); // Simpan token baru
                    // Setel ulang permintaan dengan token baru
                    error.config.headers['Authorization'] = `Bearer ${data.access}`;
                    return axios(error.config); // Ulangi permintaan
                } catch (refreshError) {
                    // Jika refresh token juga gagal, hapus semua token dan redirect ke login
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/'; // Ganti dengan path login yang sesuai
                }
            } else {
                // Hapus semua token dan redirect jika tidak ada refresh token
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/'; // Ganti dengan path login yang sesuai
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
