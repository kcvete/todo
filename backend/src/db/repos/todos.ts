import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {Todo} from '../models';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class TodosRepository {

    /**
     * @param db
     */
    constructor(private db: IDatabase<any>) {
    }

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, completed BOOLEAN NOT NULL)');
    }

    // Drops the table;
    async drop(): Promise<null> {
        return this.db.none('DROP TABLE IF EXISTS todos');
    }

    // Removes all records from the table;
    async empty(): Promise<null> {
        return this.db.none('DELETE FROM todos');
    }

    // Adds a new todo, and returns the new object;
    async add(title: string, description: string, completed: boolean): Promise<Todo> {
        return this.db.one('INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3)', [title, description, completed]);
    }

    // Tries to delete a todo by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result('DELETE FROM todos WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a todo from id;
    async findById(id: number): Promise<Todo | null> {
        return this.db.oneOrNone('SELECT * FROM todos WHERE id = $1', +id);
    }

    // Tries to find a todo from title;
    async findByName(title: string): Promise<Todo | null> {
        return this.db.oneOrNone('SELECT * FROM todos WHERE title = $1', title);
    }

    // Updates a todo by id, and returns the number of records updated;
    async updateById(id: number, title: string, description: string, completed: boolean): Promise<number> { 
        return this.db.result('UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4', [title, description, completed, id], (r: IResult) => r.rowCount);
    }

    // Returns all todo records;
    async all(): Promise<Todo[]> {
        return this.db.any('SELECT * FROM todos');
    }

    // Returns the total number of todos;
    async total(): Promise<number> {
        return this.db.one('SELECT count(*) FROM todos', [], (a: { count: string }) => +a.count);
    }
}