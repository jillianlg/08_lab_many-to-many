const pool = require('../utils/pool');

module.exports = class Class {
  id;
  subject;
  instructor;

  constructor(row) {
    this.id = String(row.id);
    this.subject = row.subject;
    this.instructor = row.instructor;
  }


};
