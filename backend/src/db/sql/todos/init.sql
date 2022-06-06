/*
    Inserting a few demo todos into the database, and returning their id-s;
    NOTES:
    - You can do multiple separate inserts, if you want, but using
      a single concatenated insert is significantly faster.
    See also:
    https://github.com/vitaly-t/pg-promise/wiki/Performance-Boost
*/
INSERT INTO todos(title, description, completed) VALUES
('Finnish Todo exercise', 'Implement backend and frontend implementation of TODO app', false),
('Take a nap', 'It is important to have a nap every once in a while', true),
('Learn SQL', 'Learn SQL and make a todo app', true)
RETURNING id