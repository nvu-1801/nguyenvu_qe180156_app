import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Table, Button, Spinner, Alert, Modal, Form, FormControl, Row, Col, Container } from "react-bootstrap";
import { useStudents } from "../Context/StudentContext";

const StudentList = () => {
  const { students, removeStudent, editStudent, addStudent, loading, error } = useStudents();
  const [studentArray, setStudentArray] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  // Update student array when the students prop changes
  useEffect(() => {
    setStudentArray(students?.[0]?.data || []);
  }, [students]);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedStudent(null);
  };

  const handleSave = async () => {
    if (selectedStudent) {
      try {
        const response = await editStudent(selectedStudent._id, {
          studentCode: selectedStudent.studentCode,
          name: selectedStudent.name,
          isActive: selectedStudent.isActive,
        });

        if (response.success) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        } else {
          alert("Update failed.");
        }
      } catch (error) {
        console.error("Update error:", error);
      }
    }
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async () => {
    if (name && studentCode) {
      await addStudent({ studentCode, name, isActive });
      setName("");
      setStudentCode("");
      setIsActive(true);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (studentArray.length === 0) return <div>No students found.</div>;

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Total Students: {studentArray.length}</h2>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          Student updated successfully!
        </Alert>
      )}

      <Row className="mt-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Student Name</Form.Label>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Student Code</Form.Label>
            <FormControl
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="Enter student code"
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Active"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="mt-3"
          />
        </Col>
        <Col md={6} className="d-flex align-items-end">
          <Button variant="success" onClick={handleAddStudent}>
            Add Student
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr className="text-center align-middle">
            <th>STT</th>
            <th>Student ID</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center align-middle">
          {studentArray.map((student, index) => (
            <tr key={student._id || index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/student/${student._id}`}>{student._id}</Link>
              </td>
              <td>{student.studentCode}</td>
              <td>{student.isActive ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEditClick(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => removeStudent(student._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedStudent.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Student Code</Form.Label>
                <Form.Control
                  type="text"
                  name="studentCode"
                  value={selectedStudent.studentCode}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Is Active</Form.Label>
                <Form.Select
                  name="isActive"
                  value={selectedStudent.isActive}
                  onChange={(e) =>
                    setSelectedStudent((prev) => ({
                      ...prev,
                      isActive: e.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentList;
