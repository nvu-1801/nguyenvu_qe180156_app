// src/api/studentApi.js
import axios from 'axios';

// Base URL của API
const API_URL = 'https://student-api-nestjs.onrender.com';

// Lấy thông tin chung (GET /info)
export const getInfo = async () => {
  const response = await axios.get(`${API_URL}/info`);
  return response.data;
};

// Lấy danh sách sinh viên (GET /students)
export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

// Lấy chi tiết một sinh viên theo ID (GET /students/{id})
export const getStudentById = async (id) => {
  const response = await axios.get(`${API_URL}/students/${id}`);
  return response.data;
};

// Thêm mới một sinh viên (POST /students)
export const createStudent = async (student) => {
  const response = await axios.post(`${API_URL}/students`, student);
  return response.data;
};

// Cập nhật thông tin sinh viên (PUT /students/{id})
export const updateStudent = async (id, student) => {
  const response = await axios.put(`${API_URL}/students/${id}`, student);
  return response.data;
};

// Xóa sinh viên theo ID (DELETE /students/{id})
export const deleteStudent = async (id) => {
  await axios.delete(`${API_URL}/students/${id}`);
};
