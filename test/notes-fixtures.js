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
  makeNotesArray
};
