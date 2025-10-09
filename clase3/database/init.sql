
CREATE SCHEMA IF NOT EXISTS test;

CREATE TABLE IF NOT EXISTS test.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO test.users (name, address) VALUES ('maria', 'maria@example.com');
INSERT INTO test.users (name, address) VALUES ('stiven', 'stiven@example.com');
INSERT INTO test.users (name, address) VALUES ('marce', 'marce@example.com');
INSERT INTO test.users (name, address) VALUES ('juan', 'juan@example.com');
