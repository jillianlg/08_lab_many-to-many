DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS subjects_students;


CREATE TABLE subjects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  topic TEXT NOT NULL,
  instructor TEXT NOT NULL
);

CREATE TABLE students (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL, 
  email TEXT  
);

CREATE TABLE subjects_students (
  subject_id BIGINT REFERENCES subjects(id),
  student_id BIGINT REFERENCES students(id),
  PRIMARY KEY(subject_id, student_id)
);

