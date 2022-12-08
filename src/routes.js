//const apiPath = 'https://my-todo-server-kms.herokuapp.com';
const apiPath = 'http://localhost:3000'; 
//Запустить сервер локально

const routes = {
  todosPath: () => [apiPath, 'todos'].join(pathSeparator),
  editPath: (id) => [apiPath, 'todos', id].join(pathSeparator),
};

export const pathSeparator = '/';

export default routes;
