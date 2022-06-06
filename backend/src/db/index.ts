
import pgPromise from 'pg-promise'; // pg-promise core library
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import * as dbConfig from '../../db-config.json'; // db connection details
console.log('dbConfig: ', dbConfig);
import {IExtensions, TodosRepository} from './repos';
type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

console.log("hmmmm")
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
const db: ExtendedProtocol = pgp(dbConfig);

export default db;