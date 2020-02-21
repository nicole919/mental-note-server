module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgreql://nicole:1234@localhost/mental-note",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://nicole:1234@localhost/mental-note-server",
  JWT_SECRET: process.env.JWT_SECRET || "super-secret"
};
