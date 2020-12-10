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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM subjects WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw Error(`No subject with id ${id} found.`);

    return new Subject(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM subjects');

    return rows.map(row => new Subject(row));
  }

};
