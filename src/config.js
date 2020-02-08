module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgreql://nicole:1234@localhost/mental-note",
  JWT_SECRET: process.env.JWT_SECRET || "delete-this-nephew"
};
