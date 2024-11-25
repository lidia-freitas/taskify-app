-- Create the tasks table if it doesn't already exist
CREATE TABLE IF NOT EXISTS tasks
(
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(255) NOT NULL UNIQUE,
    checked BOOLEAN DEFAULT FALSE
);

