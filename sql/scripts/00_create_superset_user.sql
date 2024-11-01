-- Create the user if it does not exist
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles
        WHERE rolname = 'DATABASE_USER_SUPERSET') THEN
        CREATE ROLE DATABASE_USER_SUPERSET LOGIN PASSWORD 'DATABASE_PASSWORD_SUPERSET';
    END IF;
END
$$;

-- Create the database if it does not exist
\connect postgres
SELECT 'CREATE DATABASE DATABASE_DB_SUPERSET WITH OWNER = DATABASE_USER_SUPERSET'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'DATABASE_DB_SUPERSET')\gexec
