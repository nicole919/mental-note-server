const CategoriesService = {
  getAllCategories(knex) {
    return knex.select("*").from("folders");
  },

  postCategory(knex, newCategory) {
    return knex
      .insert(newCategory)
      .into("categories")
      .returning("*")
      .then(rows => rows[0]);
  },

  getById(knex, id) {
    return knex
      .from("categories")
      .select("*")
      .where("category_id", id)
      .first();
  },

  deleteCategory(knex, id) {
    return knex("categories")
      .where("category_id", id)
      .delete();
  },
  updateCategory(knex, id, updatedCategory) {
    return knex("categories")
      .where("category_id", id)
      .update(updatedCategory);
  }
};

module.exports = CategoriesService;
