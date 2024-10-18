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

  // Add student with default "Inactive" status
  const handleAddStudent = () => {
    if (studentName && studentCode) {
      const newStudent = {
        name: studentName,
        code: studentCode,
        status: "In-active", // Default status is Inactive
        selected: false,
      };
      setStudents([newStudent, ...students]);
      setStudentName("");
      setStudentCode("");
      setIsActive(false);
    }
  };

  // Toggle student selection and status when checkbox is clicked
  const handleSelectStudent = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index
        ? {
            ...student,
            selected: !student.selected,
            status: !student.selected ? "Active" : "Inactive", // Toggle status
          }
        : student
    );
    setStudents(updatedStudents);
  };

  // Delete student from the list
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
            <FormControl
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <FormControl
              placeholder="Student Code"
              className="mt-2"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
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
                        opacity: student.status === "Active" ? 1 : 0.5, // Faded if inactive
                        transition: "opacity 0.3s ease-in-out", // Smooth transition
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
