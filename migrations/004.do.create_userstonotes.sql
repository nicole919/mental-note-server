ALTER TABLE notes 
    ADD COLUMN
         user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE notes   
    ADD COLUMN
        suggesting_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

