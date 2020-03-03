const knex = require("knex");
const app = require("../src/app");
const { makeCategoriesArray } = require("./notes-fixtures");

describe("Category Endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("categories").truncate());

  afterEach("cleanup", () => db("categories").truncate());

  context("Given there are categories in the database", () => {
    const testCategories = makeCategoriesArray();

    beforeEach("insert categories", () => {
      return db.into("categories").insert(testCategories);
    });

    it("responds with 200 and the specified category", () => {
      const CategoryId = 2;
      const expectedCategory = testCategories[CategoryId - 1];
      return supertest(app)
        .get(`/api/notes/${category_id}`)
        .expect(200, expectedCategory);
    });
  });
});


it("adds a new category to the store", () => {
    const newCategory = {
      category_name = "test-category"
    };
    return supertest(app)
      .post(`/api/categories`)
      .send(newCategory)
      .expect(201)
      .expect(res => {
        expect(res.body.category_name).to.eql(newCategory.category_name);
        expect(res.body).to.have.property("id");
        expect(res.headers.location).to.eql(`/api/notes/${res.body.id}`);
      })
      .then(res =>
        supertest(app)
          .get(`/api/categories/${res.body.id}`)
          .expect(res.body)
      );
  });
