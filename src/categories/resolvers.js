import { generalRequest, getRequest } from '../../utilities';
// import { url, port, entryPoint } from './server';

// const URL = `http://${url}:${port}/${entryPoint}`;

const url_source_lambda = '172.17.0.1';
const port_source_lambda = '3000';
const entryPoint_create_user = 'api/v1/users';

const URL_CREATE_USER = `http://${url_source_lambda}:${port_source_lambda}/${entryPoint_create_user}`;

const entryPoint_login_user = 'api/v1/auth/login';

const URL_LOGIN_USER = `http://${url_source_lambda}:${port_source_lambda}/${entryPoint_login_user}`;

const entryPoint_query_users = 'api/v1/users/_';

const URL_QUERY_USER = `http://${url_source_lambda}:${port_source_lambda}/${entryPoint_query_users}`;


const resolvers = {
	Query: {
		// allCategories: (_) =>
		// 	getRequest(URL, ''),
		// categoryById: (_, { id }) =>
		// 	generalRequest(`${URL}/${id}`, 'GET'),
		allUsers:(_)=>
			generalRequest(`${URL_QUERY_USER}/`, 'GET')
	},
	Mutation: {
		// createCategory: (_, { category }) =>
		// 	generalRequest(`${URL}/`, 'POST', category),
		// updateCategory: (_, { id, category }) =>
		// 	generalRequest(`${URL}/${id}`, 'PUT', category),
		// deleteCategory: (_, { id }) =>
		// 	generalRequest(`${URL}/${id}`, 'DELETE'),

		createUser:(_,{ user })=>
			generalRequest(`${URL_CREATE_USER}/`, 'POST', user),

		loginUser:(_,{ userlogin })=>
			generalRequest(`${URL_LOGIN_USER}/`, 'POST', userlogin)
	}
};

export default resolvers;
