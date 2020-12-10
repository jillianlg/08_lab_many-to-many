const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
    
describe('subjects routes', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a new subject via POST', async() => {
    const res = await request(app)
      .post('/api/v1/subjects')
      .send({
        topic: 'Dev 101',
        instructor: 'Dani',
      });

    expect(res.body).toEqual({
      id: '1',
      topic: 'Dev 101',
      instructor: 'Dani',
    });
  });

});
