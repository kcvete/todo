
import pgPromise from 'pg-promise'; // pg-promise core library
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import {IExtensions, TodosRepository} from './repos';
type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: ExtendedProtocol, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.todos = new TodosRepository(obj);
    },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
let db: ExtendedProtocol;
try {
    db = pgp({
        host: process.env.HOST,
        port: +process.env.DATABASE_PORT,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD
    });
    
} catch (error) {
    console.log('error: ', error);
    
}

export default db;