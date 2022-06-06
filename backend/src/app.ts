import express from 'express';
import db from './db';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())


db.connect();

//////////////////////////////////////////////
// Todos Web API
//////////////////////////////////////////////

// create table Todos:
GET('/todos/create', () => db.todos.create());

// add some initial records:
GET('/todos/init', () => db.todos.init());

// remove all records from the table:
GET('/todos/empty', () => db.todos.empty());

// drop the table:
GET('/todos/drop', () => db.todos.drop());

// add a new todo, if it doesn't exist yet, and return the object:
POST('/todos/', req => {
    return db.todos.add(req.body.title, req.body.description, req.body.completed, req.body.deadline);
});

// edit a todo, if it doesn't exist yet, and return the object:
PUT('/todos/:id', req => {
    return db.todos.updateById(req.params.id, req.body.title, req.body.description, req.body.completed, req.body.deadline);
});


// find a todo by id:
GET('/todos/find/:id', (req: any) => db.todos.findById(req.params.id));

// remove a todo by id:
DELETE('/todos/:id', (req: any) => db.todos.remove(req.params.id));

// get all todos:
GET('/todos/', () => db.todos.all());

// count all todos:
GET('/todos/count', () => db.todos.total());


// Generic GET handler;
function GET(url: string, handler: (req: any) => any) {
    app.get(url, async (req, res) => {
        try {
            const data = await handler(req);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    });
}

// Generic POST handler;
function POST(url: string, handler: (req: any) => any) {
    app.post(url, async (req, res) => {
        try {
            const data = await handler(req);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    });
}

// Generic PUT handler;
function PUT(url: string, handler: (req: any) => any) {
    app.put(url, async (req, res) => {
        try {
            const data = await handler(req);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    });
}

// Generic DELETE handler;
function DELETE(url: string, handler: (req: any) => any) {
    app.delete(url, async (req, res) => {
        try {
            const data = await handler(req);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    });
}

const port = 5000;

app.listen(port, () => {
    console.log('\nReady for GET requests on http://localhost:' + port);
});
