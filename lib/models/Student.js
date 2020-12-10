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

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM students WHERE id=$1',
      [id]
    );

    if(!rows[0]) throw Error(`No student with id ${id} found.`);

    return new Student(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM students');

    return rows.map(row => new Student(row));
  }

  static async update(id, { name, email }) {
    const { rows } = await pool.query(
      `UPDATE students
        SET name=$1,
            email=$2
        WHERE id=$3
        RETURNING *`,
      [name, email, id]
    );
    if(!rows[0]) throw Error(`No student with id ${id} found.`);

    return new Student(rows[0]);
  }

};
