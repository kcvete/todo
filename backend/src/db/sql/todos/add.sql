/*
    Inserts a new Todo record.
*/
INSERT INTO todos(title, description, completed, deadline)
VALUES($1, $2, $3, $4)
RETURNING *