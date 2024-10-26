import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../hooks/studentApi';

// Khởi tạo Context
const StudentContext = createContext();

// Custom hook để sử dụng Context dễ dàng trong các component
export const useStudents = () => useContext(StudentContext);

// Provider để bao bọc các component con và cung cấp dữ liệu
export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]); // Khởi tạo state cho danh sách sinh viên
  const [loading, setLoading] = useState(true); // State để theo dõi quá trình load dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi nếu có

  // Gọi fetchStudents() khi component được mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Hàm lấy danh sách sinh viên từ API
  const fetchStudents = async () => {
    try {
      setLoading(true); // Bắt đầu load dữ liệu
      const data = await getStudents();
      // Đảm bảo dữ liệu là mảng
      const studentArray = Array.isArray(data) ? data : [data];
      setStudents(studentArray); // Cập nhật state với danh sách sinh viên
      setLoading(false); // Kết thúc quá trình load
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setError('Could not fetch students'); // Cập nhật lỗi
      setLoading(false); // Kết thúc quá trình load
    }
  };

  // Hàm thêm sinh viên mới
  const addStudent = async (student) => {
    try {
      await createStudent(student);
      fetchStudents(); // Refresh danh sách sau khi thêm
    } catch (error) {
      console.error('Failed to add student:', error);
      setError('Could not add student');
    }
  };

  const editStudent = async (id, updatedStudent) => {
    try {
      const response = await updateStudent(id, updatedStudent); // Gọi API cập nhật
      console.log('Update Response:', response); // Log để kiểm tra
  
      // Gọi lại API để làm mới danh sách sinh viên sau khi cập nhật
      fetchStudents(); 
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };
  
  // Hàm xóa sinh viên
  const removeStudent = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents(); // Refresh danh sách sau khi xóa
    } catch (error) {
      console.error('Failed to delete student:', error);
      setError('Could not delete student');
    }
  };

  return (
    <StudentContext.Provider value={{ students, addStudent, editStudent, removeStudent, loading, error }}>
      {children}
    </StudentContext.Provider>
  );
};
