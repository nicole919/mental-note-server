const path = require("path");
const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const NotesService = require("./notes-service");

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = note => note;

notesRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");
    if (req.query.userOnly) {
      if (req.query.category_id) {
        NotesService.getUserNotesInCategory(
          knexInstance,
          req.user.id,
          req.query.category_id
        )
          .then(notes => {
            res.json(notes.map(serializeNote));
          })
          .catch(next);
      } else {
        console.log("shdfsjdhfjskilodjf");
        NotesService.getUserNotes(knexInstance, req.user.id)
          .then(notes => {
            res.json(notes.map(serializeNote));
          })
          .catch(next);
      }
    } else {
      console.log("shdfsjdhfjskilodjf");
      NotesService.getAllNotesFeed(knexInstance)
        .then(notes => {
          res.json(notes.map(serializeNote));
        })
        .catch(next);
    }
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

    // not logged in at all return;
    if (!req.user) {
      return res.status(401).end();
    }

    const newNote = {
      title,
      category_id,
      whereat,
      comments,
      user_id:
        req.user.id && !user_id && !suggesting_user_id ? req.user.id : user_id,
      suggesting_user_id
    };

    console.log(
      req.user.id && !user_id && !suggesting_user_id ? req.user.id : user_id
    );
    console.log(req.user);
    console.log(newNote);

    for (const [key, value] of Object.entries(newNote)) {
      if (value == null && key !== "suggesting_user_id" && key !== "user_id") {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
      }
    }

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
