INSERT INTO categories (category_id)
VALUES
('Movies'),
('Shows'),
('Books')

INSERT INTO notes (id, title, category_id, whereat, comments)
VALUES
(1, 'Star Wars', '1', 'disney +', 'looks neato'),
(2, 'The Witcher', '2', 'netflix', 'is only 8 eps'),
(3, 'Harry Potter', '3', 'borrow from friend', 'dang i should read that'),
(4, 'Funny Face', '1', '?', 'comment'),
(5, 'Nailed It!', '2', 'netflix', 'lily would like this');
