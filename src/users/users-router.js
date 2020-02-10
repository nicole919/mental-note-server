const express = require("express");
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");
const UsersService = require("./users-service");
const AuthService = require("../auth/auth-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

const serializeNote = note => ({
  note_id: note.note_id,
  title: note.title,
  category_id: note.category_id,
  whereat: note.whereat,
  comments: note.comments
});
usersRouter.get("/:user_id", (req, res, next) => {
  UsersService.getUser(req.app.get("db"), req.params.user_id)
    .then(user => {
      res.json(user[0]);
    })
    .catch(next);
});

usersRouter.get("/:user_id/notes", (req, res, next) => {
  UsersService.getNotesForUser(req.app.get("db"), req.params.user_id)
    .then(notes => {
      res.json(notes.map(serializeNote));
    })
    .catch(next);
});

usersRouter.post("/:user_id/notes", requireAuth, jsonBodyParser);

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { user_name, password, interests } = req.body;

  for (const field of ["interests", "user_name", "password"]) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
    }
  }

  const passwordError = UsersService.validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }

  UsersService.hasUserWithUserName(req.app.get("db"), user_name)
    .then(hasUserWithUserName => {
      if (hasUserWithUserName) {
        return res.status(400).json({ error: `Username is already taken` });
      }

      return UsersService.hashPassword(password).then(hashedPassword => {
        const newUser = {
          user_name,
          password: hashedPassword,
          interests
        };

        return UsersService.insertUser(req.app.get("db"), newUser).then(
          user => {
            const sub = user.user_name;
            const payload = { user_id: user.id };
            const authToken = AuthService.createJwt(sub, payload);

            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `${user.id}`))
              .json({ user: UsersService.serializeUser(user), authToken });
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
