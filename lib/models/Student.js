const pool = require('../utils/pool');

module.exports = class Student {
  id;
  name;
  email;

  constructor(row) {
    this.id = String(row.id);
    this.name = row.name;
    this.email = row.email;
  }

  static async insert({ name, email }) {
    const results = await pool.query(
      'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    return new Student(results.rows[0]);
  }
};
