import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {Todo} from '../models';
import {todos as sql} from '../sql';

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
        return this.db.none(sql.create);
    }

    // Initializes the table with some todo records, and return their id-s;
    async init(): Promise<number[]> {
        return this.db.map(sql.init, [], (row: { id: number }) => row.id);
    }

    // Drops the table;
    async drop(): Promise<null> {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    async empty(): Promise<null> {
        return this.db.none(sql.empty);
    }

    // Adds a new todo, and returns the new object;
    async add(title: string, description: string, completed: boolean, deadline: Date): Promise<Todo> {
        return this.db.one(sql.add, [title, description, completed, deadline]);
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
    async updateById(id: number, title: string, description: string, completed: boolean, deadline: Date): Promise<number> { 
        console.log('id: ', id);
        return this.db.result('UPDATE todos SET title = $1, description = $2, completed = $3, deadline = $4 WHERE id = $5', [title, description, completed, deadline, id], (r: IResult) => r.rowCount);
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