ALTER TABLE notes
    DROP COLUMN IF EXISTS user_id;
ALTER TABLE notes
    DROP COLUMN IF EXISTS suggesting_user_id;

