import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [students, setStudents] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  const addStudent = async (form) => {
    const res = await axios.post("http://localhost:5000/students", form);
    setStudents([...students, res.data]);
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    setStudents(students.filter(s => s._id !== id));
  };

  return (
    <div className="container">
      <h1>Student Management App</h1>

      <h3>Register New Student</h3>
      <StudentForm addStudent={addStudent} />

      <p className="count">Total Registrations : {students.length}</p>

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Hide Students" : "View All Students"}
      </button>

      {/* Show Student list only when clicked */}
      {showList && (
        <>
          <h3>Registered Student List</h3>
          <StudentList
            students={students}
            deleteStudent={deleteStudent}
          />
        </>
      )}
    </div>
  );
}

export default App;