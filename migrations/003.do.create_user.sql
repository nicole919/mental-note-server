    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        user_name TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )