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

  const handleAddStudent = () => {
    if (studentName && studentCode) {
      const newStudent = {
        name: studentName,
        code: studentCode,
        status: isActive ? "Active" : "Inactive",
        selected: false,
      };
      setStudents([...students, newStudent]);
      setStudentName("");
      setStudentCode("");
      setIsActive(false);
    }
  };

  const handleDeleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const handleSelectStudent = (index) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, selected: !student.selected } : student
    );
    setStudents(updatedStudents);
  };

  const handleClearSelection = () => {
    const updatedStudents = students.map((student) => ({
      ...student,
      selected: false,
    }));
    setStudents(updatedStudents);
  };

  return (
    <ThemeProvider>

    <Container className="mt-5">
      <Row>
        <Col>
          <h2>Total Selected Student: {students.filter(s => s.selected).length}</h2>
        </Col>
        <Col>
          <Button onClick={handleClearSelection}>Clear</Button>
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
          <Button onClick={handleAddStudent}>Add</Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Selected</th>
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
                <td>{student.status}</td>
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
