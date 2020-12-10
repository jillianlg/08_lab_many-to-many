const express = require('express');
const Student = require('./models/Student');
const Subject = require('./models/Subject');
const app = express();

app.use(express.json());


//  endpoints for SUBJECT
app.post('/api/v1/subjects', (req, res, next) => {
  Subject
    .insert(req.body)
    .then(subject => res.send(subject))
    .catch(next);
});

app.get('/api/v1/subjects/:id', (req, res, next) => {
  Subject
    .findById(req.params.id)
    .then(subject => res.send(subject))
    .catch(next);
});

app.get('/api/v1/subjects', (req, res, next) => {
  Subject
    .find()
    .then(subject => res.send(subject))
    .catch(next);
});

app.put('/api/v1/subjects/:id', (req, res, next) => {
  Subject
    .update(req.params.id, req.body)
    .then(subject => res.send(subject))
    .catch(next);
});



//  endpoints for STUDENT
app.post('/api/v1/students', (req, res, next) => {
  Student
    .insert(req.body)
    .then(student => res.send(student))
    .catch(next);
});

app.get('/api/v1/students/:id', (req, res, next) => {
  Student
    .findById(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});

app.get('/api/v1/students', (req, res, next) => {
  Student
    .find()
    .then(student => res.send(student))
    .catch(next);
});

module.exports = app;

