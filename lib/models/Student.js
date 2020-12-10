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


};
