const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
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

});
