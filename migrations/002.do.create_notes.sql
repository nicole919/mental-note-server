CREATE TABLE notes (
    note_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(category_id) ON DELETE CASCADE NOT NULL,
    whereat TEXT,
    comments TEXT
)