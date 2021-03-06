const NotesService = {
  getNotesFeedForUser(knex, user_id) {
    return knex
      .join("categories", { "notes.category_id": "categories.category_id" })
      .select(
        "*",
        "user.user_name AS user_name",
        "suggesting_user.user_name AS suggesting_user_name"
      )
      .from("notes")
      .innerJoin("users AS user", "notes.user_id", "user.id")
      .leftJoin(
        "users AS suggesting_user",
        "notes.suggesting_user_id",
        "suggesting_user.id"
      )
      .where({ user_id: user_id })
      .orWhere({ suggesting_user_id: user_id });
  },
  getUserNotes(knex, user_id) {
    return knex
      .join("categories", { "notes.category_id": "categories.category_id" })
      .select("*", "user.user_name AS user_name")
      .from("notes")
      .innerJoin("users AS user", "notes.user_id", "user.id")
      .where({ user_id: user_id });
  },

  getUserNotesInCategory(knex, user_id, category_id) {
    return knex

      .select("*", "user.user_name AS user_name")
      .from("notes")
      .innerJoin("users AS user", "notes.user_id", "user.id")
      .where({ user_id: user_id })
      .andWhere({ category_id: category_id });
  },

  getAllNotesFeed(knex) {
    return knex
      .join("categories", { "notes.category_id": "categories.category_id" })
      .select(
        "*",
        "user.user_name AS user_name",
        "suggesting_user.user_name AS suggesting_user_name"
      )
      .from("notes")
      .innerJoin("users AS user", "notes.user_id", "user.id")
      .leftJoin(
        "users AS suggesting_user",
        "notes.suggesting_user_id",
        "suggesting_user.id"
      );
  },
  insertNote(knex, newNote) {
    if (newNote.title.length > 25) {
      throw new Error("title cannot exceed 25 characters");
    }
    if (newNote.whereat.length > 255) {
      throw new Error("where cannot exceed 255 characters");
    }
    return knex
      .insert(newNote)
      .into("notes")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("notes")
      .select("*")
      .where("note_id", id)
      .first();
  },
  deleteNote(knex, id) {
    return knex("notes")
      .where({ note_id: id })
      .delete();
  },
  updateNote(knex, id, newNoteFields) {
    return knex("notes")
      .where({ note_id: id })
      .update(newNoteFields);
  }
};
module.exports = NotesService;
