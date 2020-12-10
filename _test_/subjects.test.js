const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const Subject = require('../lib/models/Subject');
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

  it('finds a subject by id via GET', async() => {
    const subject = await Subject.insert({
      topic: 'Dev 101',
      instructor: 'Dani',
    });

    const res = await request(app)
      .get(`/api/v1/subjects/${subject.id}`);

    expect(res.body).toEqual(subject);
  });

});
