const CategoriesService = {
  getAllCategories(knex) {
    return knex.select("*").from("categories");
  },

  postCategory(knex, newCategory) {
    if (newCategory.category_name.length > 25) {
      throw new Error("category name cannot exceed 25 characters");
    }
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
