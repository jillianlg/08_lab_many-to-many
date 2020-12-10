const pool = require('../utils/pool');

module.exports = class Subject {
  id;
  topic;
  instructor;

  constructor(row) {
    this.id = String(row.id);
    this.topic = row.topic;
    this.instructor = row.instructor;
  }

  static async insert({ topic, instructor }) {
    const results = await pool.query(
      'INSERT INTO subjects (topic, instructor) VALUES ($1, $2) RETURNING *',
      [topic, instructor]
    );

    return new Subject(results.rows[0]);
  }

};
