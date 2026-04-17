import React, { useState } from "react";

function StudentForm({ addStudent }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError(""); // clear error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // conditions Validation
    if (!form.name || !form.age || !form.course) {
      setError("All fields are required");
      return;
    }

    if (form.age < 18) {
      setError("Age must be greater than or equal to 18");
      return;
    }

    // If valid
    addStudent(form);
    setForm({ name: "", age: "", course: "" });
    setError("");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default StudentForm;