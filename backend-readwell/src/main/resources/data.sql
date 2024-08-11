-- data.sql

-- This is a comment to indicate execution
CREATE TABLE IF NOT EXISTS test_data (
     id SERIAL PRIMARY KEY,
     message VARCHAR(255) NOT NULL
    );

INSERT INTO test_data (message) VALUES ('Hello from the database!');
