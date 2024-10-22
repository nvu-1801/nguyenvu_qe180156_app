import "./App.css";
import {
  Container,
  Row,
  Table,
  Col,
  Button,
  FormControl,
  Form,
  ThemeProvider,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [isActive, setIsActive] = useState(false);

  // Add student with dynamic status based on isActive state
  const handleAddStudent = () => {
    if (studentName && studentCode) {
      const newStudent = {
        name: studentName,
        code: studentCode,
        status: isActive ? "Active" : "Inactive",
        selected: false,
      };
      setStudents([newStudent, ...students]);
      setStudentName("");
      setStudentCode("");
      setIsActive(false);
    }
  };

  // Toggle student selection and update status
  const handleSelectStudent = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index
        ? {
            ...student,
            selected: !student.selected,
            status: !student.selected ? "Active" : "Inactive", 
          }
        : student
    );
    setStudents(updatedStudents);
  };

  // Delete a student from the list
  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  // Clear all students
  const handleClearSelection = () => {
    setStudents([]);
  };

  return (
    <ThemeProvider>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>
              Total Selected Student:{" "}
              {students.filter((s) => s.selected).length}
            </h2>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleClearSelection}>
              Clear
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Student Name</Form.Label>
              <FormControl
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 'bold' }}>Student Code</Form.Label>
              <FormControl
                placeholder="Enter student code"
                className="mt-2"
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Still Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="mt-2"
            />
          </Col>
          <Col>
            <Button variant="success" onClick={handleAddStudent}>
              Add
            </Button>
          </Col>
        </Row>

        <Row className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Student Name</th>
                <th>Student Code</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={student.selected}
                      onChange={() => handleSelectStudent(index)}
                    />
                  </td>
                  <td>{student.name}</td>
                  <td>{student.code}</td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        student.status === "Active"
                          ? "bg-info text-white"
                          : "bg-danger text-white"
                      }`}
                      style={{
                        padding: "8px 12px",
                        fontSize: "14px",
                        opacity: student.status === "Active" ? 1 : 0.5,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteStudent(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
