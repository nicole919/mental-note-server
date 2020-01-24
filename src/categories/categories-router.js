const path = require("path");
const express = require("express");
const CategoriesService = require("./categories-service");

const categoriesRouter = express.Router();
const jsonParser = express.json();

const serializeCategory = category => ({
  category_id: category.category_id,
  category_name: category.category_name
});

categoriesRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");

    CategoriesService.getAllCategories(knexInstance)
      .then(categories => {
        res.json(categories.map(serializeCategory));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const { category_name } = req.body;
    const newCategory = { category_name };

    for (const [key, value] of Object.entries(newCategorie))
      if (value == null)
        return res.status(400).json({
          error: { message: ` missing ${key} in request body` }
        });

    CategoriesService.postCategory(knexInstance, newCategory)
      .then(category => {
        res
          .status(201)
          .location(
            path.posix.join(req.originalUrl + `${category.category_id}`)
          )
          .json(serializeCategory(category));
      })
      .catch(next);
  });

CategoriesRouter.route("/:category_id")
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");
    const category_id = req.params.category_id;

    CategoriesService.getById(knexInstance, category_id)
      .then(category => {
        if (!category) {
          return res.status(404).json({
            error: { message: `Category does not exist` }
          });
        }
        res.category = category;
        next();
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(serializeCategory(res.category));
  })
  .delete((req, res, next) => {
    const knexInstance = req.app.get("db");
    const categoryToDelete = req.params.category_id;

    CategoriesService.deleteCategory(knexInstance, CategoryToDelete)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const categoryToUpdate = req.params.category_id;
    const { category_name } = req.body;
    const updatedCategory = { category_name };

    if (!category_name) {
      return res.status(400).json({
        error: { message: `request body must contain ${key}` }
      });
    }
    CategoryService.updateCategory(
      knexInstance,
      categoryToUpdate,
      updatedCategory
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });
module.exports = CategoriesRouter;
