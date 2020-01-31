const path = require("path");
const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const NotesService = require("./notes-service");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = note => ({
  note_id: note.note_id,
  title: note.title,
  category_id: note.category_id,
  whereat: note.whereat,
  comments: note.comments,
  user_id: note.user_id,
  suggesting_user_id: note.suggesting_user_id
});

notesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NotesService.getAllNotes(knexInstance)
      .then(notes => {
        res.json(notes.map(serializeNote));
      })
      .catch(next);
  })

  .post(jsonParser, requireAuth, (req, res, next) => {
    const {
      title,
      category_id,
      whereat,
      comments,
      user_id,
      suggesting_user_id
    } = req.body;

    if (
      req.user.user_id !== user_id &&
      req.user.user_id !== suggesting_user_id
    ) {
      return res.status(401);
    }
    const newNote = {
      title,
      category_id,
      whereat,
      comments,
      user_id,
      suggesting_user_id
    };

    for (const [key, value] of Object.entries(newNote))
      if (value == null && key !== "suggesting_user_id")
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
    NotesService.insertNote(req.app.get("db"), newNote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.note_id}`))
          .json(serializeNote(note));
      })
      .catch(next);
  });

notesRouter
  .route("/:note_id")
  .all((req, res, next) => {
    NotesService.getById(req.app.get("db"), req.params.note_id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `note does not exist` }
          });
        }
        res.note = note;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeNote(res.note));
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get("db"), req.params.note_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

//   .patch(jsonParser, (req, res, next) => {
//     const knexInstance = req.app.get("db");
//     const { title, category_id, whereat, comments } = req.body;
//     const noteToUpdate = req.params.note_id;
//     const { }
//     const updatedNote = { }
//     const numberofValues = Object.values(noteToUpdate).filter(Boolean).length;

//     if (numberofValues === 0) {
//       return res.status(400).json({
//         error: {
//           message: `request body must contain either 'title', 'category', 'where', or 'comments'`
//         }
//       });
//     }

//     NotesService.updateNote(req.app.get("db"), req.params.title, noteToUpdate)
//       .then(numRowsAffected => {
//         res.status(204).end();
//       })
//       .catch(next);
//   });

module.exports = notesRouter;
