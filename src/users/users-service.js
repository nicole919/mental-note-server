const xss = require("xss");
const bcrypt = require("bcryptjs");

const UsersService = {
  getNotesForUser(db, user_id) {
    return db
      .select("*")
      .from("notes")
      .where({ user_id });
  },

  getUser(db, user_id) {
    return db
      .select("*")
      .from("users")
      .where({ id: user_id });
  },
  hasUserWithUserName(db, user_name) {
    return db
      .from("users")
      .where({ user_name })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }

    if (password.length > 72) {
      return "Password should be less than 72 characters";
    }

    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty space";
    }

    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      user_name: xss(user.user_name),
      interests: xss(user.interests)
    };
  }
};

module.exports = UsersService;
