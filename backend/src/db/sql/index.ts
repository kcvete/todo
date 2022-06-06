import {QueryFile, IQueryFileOptions} from 'pg-promise';

const {join: joinPath} = require('path');


export const todos = {
    create: sql('todos/create.sql'),
    empty: sql('todos/empty.sql'),
    init: sql('todos/init.sql'),
    drop: sql('todos/drop.sql'),
    add: sql('todos/add.sql')
};

///////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file: string): QueryFile {

    const fullPath: string = joinPath(__dirname, file); // generating full path;

    const options: IQueryFileOptions = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true

        // See also property 'params' for two-step template formatting
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        console.error(qf.error);
    }

    return qf;

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

///////////////////////////////////////////////////////////////////
// Possible alternative - enumerating all SQL files automatically:
// http://vitaly-t.github.io/pg-promise/utils.html#.enumSql
