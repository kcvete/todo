/*
    Creates table Todos.
*/
CREATE TABLE todos
(
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text,
    completed boolean NOT NULL DEFAULT false,
    deadline timestamp without time zone,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
)