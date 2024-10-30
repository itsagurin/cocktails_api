CREATE EXTENSION IF NOT EXISTS dblink;

-- Check if the database exists and create it if not
DO
$do$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cocktails_db') THEN
        PERFORM dblink_exec('dbname=postgres', 'CREATE DATABASE cocktails_db');
    END IF;
END
$do$;

-- Connecting to the database
\c cocktails_db;

-- Checking and creating the table ‘cocktail’
CREATE TABLE IF NOT EXISTS cocktail (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(255),
    glass VARCHAR(255),
    instructions VARCHAR(65535),
    image_url VARCHAR(255),
    alcoholic BOOLEAN,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
    );

-- Checking and creating the table ‘ingredients’
CREATE TABLE IF NOT EXISTS ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(65535),
    alcohol BOOLEAN,
    percentage INTEGER,
    type VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    image_url VARCHAR(255)
    );

-- Checking and creating the table ‘cocktail_ingredient’
CREATE TABLE IF NOT EXISTS cocktail_ingredient (
    cocktail_id INTEGER REFERENCES cocktail(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE,
    measure VARCHAR(255),
    PRIMARY KEY (cocktail_id, ingredient_id)
    );
