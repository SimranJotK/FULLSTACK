const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const Student = mongoose.model('Student', new mongoose.Schema({
    name: String,
    age: Number,
    course: String
}));

app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.get('/students/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student || { message: 'Not found' });
});

app.put('/students/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student || { message: 'Not found' });
});

app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
