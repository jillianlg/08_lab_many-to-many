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

  // static async insert({ topic, instructor }) {
  //   const results = await pool.query(
  //     'INSERT INTO subjects (topic, instructor) VALUES ($1, $2) RETURNING *',
  //     [topic, instructor]
  //   );

  //   return new Subject(results.rows[0]);
  // }

  // static async findById(id) {
  //   const { rows } = await pool.query(
  //     'SELECT * FROM subjects WHERE id=$1',
  //     [id]
  //   );

  //   if(!rows[0]) throw Error(`No subject with id ${id} found.`);

  //   return new Subject(rows[0]);
  // }

  static async insert({ topic, instructor, students = [] }) {
    const { rows } = await pool.query(
      'INSERT INTO subjects (topic, instructor) VALUES ($1, $2) RETURNING *',
      [topic, instructor]
    );

    await pool.query(
      `INSERT INTO subjects_students (subject_id, student_id)
        SELECT ${rows[0].id}, id FROM students WHERE name = ANY($1::text[])`,
      [students]
    );
    return new Subject(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT 
        subjects.*,
        json_agg((students.name)) AS students
      FROM
        subjects_students
      JOIN subjects
      ON subjects_students.subject_id = subjects.id
      JOIN students
      ON subjects_students.student_id = students.id
      WHERE subjects.id=$1
      GROUP BY subjects.id`,
      [id]
    );

    if(!rows[0]) throw new Error(`No subjects found with id of ${id}`);

    return {
      ...new Subject(rows[0]),
      students: rows[0].students
    };
  }
  
  // static async findById(id) {
  //   const { rows } = await pool.query(
  //     'SELECT * FROM subjects WHERE id=$1',
  //     [id]
  //   );

  //   if(!rows[0]) throw Error(`No subject with id ${id} found.`);

  //   return new Subject(rows[0]);
  // }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM subjects');

    return rows.map(row => new Subject(row));
  }

  static async update(id, { topic, instructor }) {
    const { rows } = await pool.query(
      `UPDATE subjects
        SET topic=$1,
            instructor=$2
        WHERE id=$3
        RETURNING *`,
      [topic, instructor, id]
    );
    if(!rows[0]) throw Error(`No subject with id ${id} found.`);

    return new Subject(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM subjects WHERE id=$1 RETURNING *',
      [id]
    );

    return new Subject(rows[0]);
  }

};
