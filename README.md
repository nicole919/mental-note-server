# Mental Note server

This is a server created with Node/Express to support the Mental Note app.

# Getting Started

## Installing

Clone the repository and download the dependencies.

```
$ git clone https://github.com/nicole919/mental-note-server.git
$ cd mental-note-server
$ npm install
```

## Launching

```
$ npm start
```

## Endpoints

`GET api/notes` - returns notes

### Response

```
Status: 200 OK
{
       "note_id": 2,
        "title": "pokemon",
        "category_id": 1,
        "whereat": "netflix",
        "user_id": 2,
        "suggesting_user_id": null,
        "category_name": "Shows",
        "id": null,
        "user_name": "lily",
        "password": null,
        "interests": null,
        "suggesting_user_name": null
}
```

`GET /api/categories/` returns categories

```
{
        "category_id": 4,
        "category_name": "Books"
}
```

### ---

`POST /api/categories/` - create a new category

```
{
        "category_name":"recipes"
}
```

### Response

```
201 Created
```

```
{
        "category_id": 8,
        "category_name": "recipes"
}
```

### ---

`POST /api/notes` - create a new note
entry
| Input | Type |
| --------------- | ----------------------------------- |
| title | string (required) |
| category | integer reference(required) |
| whereat | string |

### Example

```
{
     "title": "My Little Pony",
     "category_id": 1,
     "whereat": "netflix"
}
```

### Response

```
201 Created
```

### ---

`POST api/users/` - create a user

### Example

```
{
        "user_name":"katrina",
        "password":"1234abcd",
        "interests":"animal crossing, cookies"
}
```

### Response

```
201 Created
```

```
{
     "user": {
             "id": 9,
             "user_name": "katrina",
             "interests": "animal crossing, cookies"
},
     "authToken": "[]"
}
```

### ---

`GET api/notes/note_id` - returns a single note by ID

### Example

```
GET api/note/3
```

### Response

```
{
"note_id": 3,
"title": "watchmen",
"category_id": 1,
"whereat": "hbo",
"comments": "blue man",
"user_id": 1,
"suggesting_user_id": null
}
```

`DELETE api/notes/note_id` - delete meal by ID

### Response

```
204 No Content
```

[Mental Note live site](https://mental-note.nicole919.now.sh/)

[Mental Note client-side repo](https://github.com/nicole919/mental-note)
