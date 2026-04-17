const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//  MongoDB Atlas Connection
mongoose.connect('mongodb+srv://admin123:%40Admin123@mongodbcluster1.mx4zesw.mongodb.net/studentDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

const Student = mongoose.model('Student', studentSchema);


// Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all students
app.get('/students', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// POST new student
app.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});