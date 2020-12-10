const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Student = require('../lib/models/Student');
const pool = require('../lib/utils/pool');
    
describe('students routes', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a new student via POST', async() => {
    const res = await request(app)
      .post('/api/v1/students')
      .send({
        name: 'Jamal',
        email: 'jamal@email.com',
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Jamal',
      email: 'jamal@email.com',
    });
  });

  it('finds a student by id via GET', async() => {
    const student = await Student.insert({
      name: 'Jamal',
      email: 'jamal@email.com',
    });

    const res = await request(app)
      .get(`/api/v1/students/${student.id}`);

    expect(res.body).toEqual(student);
  });

  it('finds all students via GET', async() => {
    const students = await Promise.all([
      {
        name: 'Jamal',
        email: 'jamal@email.com',
      },
      {
        name: 'Jamie',
        email: 'Jamie@email.com',
      },
      {
        name: 'Jodi',
        email: 'Jodi@email.com',
      }
    ].map(student => Student.insert(student)));

    const res = await request(app)
      .get('/api/v1/students');
    
    expect(res.body).toEqual(expect.arrayContaining(students));
    expect(res.body).toHaveLength(students.length);
  });

});
