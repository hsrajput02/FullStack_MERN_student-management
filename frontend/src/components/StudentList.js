import React from "react";

function StudentList({ students, deleteStudent }) {
  return (
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Age</th>
          <th>Course</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s, index) => (
          <tr key={s._id}>
            <td>{index + 1}</td>
            <td>{s.name}</td>
            <td>{s.age}</td>
            <td>{s.course}</td>
            <td>
              <button
                className="delete"
                onClick={() => deleteStudent(s._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentList;