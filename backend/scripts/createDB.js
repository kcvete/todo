const pgp = require('pg-promise')(/* initialization options */);


const db = pgp({
    database: 'todo',
    port: 5432,
    user: 'postgres', // any admin user
    password: 'admin'
});
console.log('db: ', db);
db.none('CREATE DATABASE $1:name', ['my_database']);