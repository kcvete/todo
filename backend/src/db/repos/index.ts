import {TodosRepository} from './todos';

// Database Interface Extensions:
interface IExtensions {
    todos: TodosRepository,
}

export {
    IExtensions,
    TodosRepository,
};