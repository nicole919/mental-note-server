function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      password: "password"
    },
    {
      id: 2,
      user_name: "test-user-1",
      password: "password"
    },
    {
      id: 3,
      user_name: "test-user-1",
      password: "password"
    }
  ];
}

function makeCategoriesArray() {
  return [
    {
      id: 1,
      category_name: "test-category-1"
    },
    {
      id: 2,
      category_name: "test-category-2"
    },
    {
      id: 3,
      category_name: "test-category-3"
    }
  ];
}
function makeNotesArray(users) {
  return [
    {
      id: 1,
      title: "name",
      category: "category",
      whereat: "whereattho",
      user_id: 1
    },
    {
      id: 2,
      title: "name",
      category: "category",
      whereat: "whereattho",
      user_id: 1
    },
    {
      id: 3,
      title: "name",
      category: "category",
      whereat: "whereattho",
      user_id: 1
    }
  ];
}

module.exports = {
  makeNotesArray,
  makeUsersArray,
  makeCategoriesArray
};
