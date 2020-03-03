const knex = require("knex");
const app = require("../src/app");
const { makeNotesArray } = require("./notes-fixtures");

describe("Notes Endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("notes").truncate());

  afterEach("cleanup", () => db("notes").truncate());

  describe("GET /api/notes/:id", () => {
    context(`Given no notes`, () => {
      it(`responds 404 when note doesn't exist`, () => {
        return supertest(app)
          .get(`/api/note/123`)
          .expect(404, {
            error: { message: `Note Not Found` }
          });
      });
    });
  });

  it("responds with 200 and the specified note", () => {
    const NoteId = 2;
    const expectedNote = testNote[NoteId - 1];
    return supertest(app)
      .get(`/api/notes/${noteId}`)
      .expect(200, expectedNote);
  });
});

describe("DELETE /api/notes/:id", () => {
  context(`Given no notes`, () => {
    it(`responds 404 when notes doesn't exist`, () => {
      return supertest(app)
        .delete(`/api/notes/123`)
        .expect(404, {
          error: { message: `Note Not Found` }
        });
    });
  });

  context("Given there are notes in the database", () => {
    const testNotes = makeNotesArray();

    beforeEach("insert notes", () => {
      return db.into("notes").insert(testNotes);
    });

    it("removes the note by ID from the store", () => {
      const idToRemove = 2;
      const expectedNotes = testNotefilter(n => n.id !== idToRemove);
      return supertest(app)
        .delete(`/api/notes/${idToRemove}`)
        .expect(204)
        .then(() =>
          supertest(app)
            .get(`/api/notes`)
            .expect(expectedNotes)
        );
    });
  });
});

describe("POST /api/notes", () => {
  it(`responds with 400 missing 'title' if not supplied`, () => {
    const newNoteMissingTitle = {
      //title: 'test-name'
      category: "test-category"
    };
    return supertest(app)
      .post(`/api/notes`)
      .send(newNoteMissingTitle)
      .expect(400, {
        error: { message: `'title' is required` }
      });
  });
});

it("adds a new note to the store", () => {
  const newNote = {
    title: "test-title",
    category: "test-category",
    whereat: "test-whereat"
  };
  return supertest(app)
    .post(`/api/notes`)
    .send(newNote)
    .expect(201)
    .expect(res => {
      expect(res.body.title).to.eql(newNote.title);
      expect(res.body.category).to.eql(newNote.category);
      expect(res.body.whereat).to.eql(newNote.whereat);
      expect(res.body).to.have.property("id");
      expect(res.headers.location).to.eql(`/api/notes/${res.body.id}`);
    })
    .then(res =>
      supertest(app)
        .get(`/api/notes/${res.body.id}`)
        .expect(res.body)
    );
});
