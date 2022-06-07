const pgp = require('pg-promise')(/* initialization options */);


const db = pgp({
    database: 'todo',
    port: 5432,
    user: "postgres",
    password: "password"
});
//db.none('CREATE DATABASE $1:name', ['my_database'])}

    
// our set of columns, to be created only once (statically), and then reused,
// to let it cache up its formatting templates for high performance:
const cs = new pgp.helpers.ColumnSet(['title', 'description', 'completed'], {table: 'todos'});
    
// data input values:
const values = [ 
    {title: 'Finnish Todo exercise', description: 'Implement backend and frontend implementation of TODO app', completed: true},
    {title: 'Take a nap', description: 'It is important to have a nap every once in a while', completed: false},
    {title: 'Learn SQL', description: 'Learn SQL and make a todo app', completed: false}
];
    
// generating a multi-row insert query:
const query = pgp.helpers.insert(values, cs);
    
// executing the query:
(async () => {
    try {
        console.log("Creating database...");
        await db.none('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, completed BOOLEAN NOT NULL)')
        console.log("Database todos created")
        await db.none(query)
        console.log("Inserted mock data in todos table")
        process.exit(0)
    } catch (error) {
        console.log('error: ', error);
    }
}
)();
