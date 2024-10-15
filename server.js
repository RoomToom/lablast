const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Connect to the database
const dbConfig = require('./config/db');
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true });

// Models
const Student = require('./models/students');

// Routes
app.get('/', (req, res) => res.send('Welcome to the MeanJS App!'));

app.get('/api/students', (req, res) => {
    Student.find({}, (err, students) => {
        if (err) res.send(err);
        res.json(students);
    });
});

app.post('/api/students/add', (req, res) => {
    console.log("Received data:", req.body); // Лог отриманих даних
    const student = new Student();
    student.name = req.body.name;
    student.surname = req.body.surname;
    student.birthdate = req.body.birthdate;
    student.groupNumber = req.body.groupNumber;
    student.save(err => {
        if (err) {
            console.log("Error saving student:", err);
            res.send(err);
        } else {
            console.log("Student added:", student);
            res.json({ message: 'Student added!' });
        }
    });
});


app.delete('/api/students/:id', (req, res) => {
    Student.remove({ _id: req.params.id }, err => {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

app.put('/api/students/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (err) res.send(err);
        student.name = req.body.name;
        student.surname = req.body.surname;
        student.birthdate = req.body.birthdate;
        student.groupNumber = req.body.groupNumber;
        student.save(err => {
            if (err) res.send(err);
            res.json({ message: 'Student updated!' });
        });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

app.get('/students', (req, res) => {
    Student.find({}, (err, students) => {
        if (err) res.send(err);
        res.json(students);
    });
});

const Group = require('./models/group');

// Додавання групи
app.post('/api/groups/add', (req, res) => {
    const group = new Group();
    group.name = req.body.name;
    group.save(err => {
        if (err) res.send(err);
        res.json({ message: 'Group added!' });
    });
});

// Отримання списку груп
app.get('/api/groups', (req, res) => {
    Group.find({}, (err, groups) => {
        if (err) res.send(err);
        res.json(groups);
    });
});

// Видалення групи
app.delete('/api/groups/:id', (req, res) => {
    Group.remove({ _id: req.params.id }, err => {
        if (err) res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
});

// Редагування групи
app.put('/api/groups/:id', (req, res) => {
    Group.findById(req.params.id, (err, group) => {
        if (err) res.send(err);
        group.name = req.body.name;
        group.save(err => {
            if (err) res.send(err);
            res.json({ message: 'Group updated!' });
        });
    });
});
