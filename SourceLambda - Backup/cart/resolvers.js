import { generalRequest} from './../../utilities.js';
import { url, port, entryPoint } from './server.js';

const healthCheck = `http://${url}:${port}/health`;
const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		healthCheck: (_) => {
			console.log(`The healthCheck route is: ${healthCheck}`)
			generalRequest(healthCheck, 'GET')},

		getCart: (_, {userId} ) => {
			const route = `${URL}/${userId}`
			console.log(`The route is: ${route}`)
			generalRequest(`${route}`, 'GET')},

		sendMessage: (_, {message} ) => {
			console.log(`The message is: ${message}`)
			generalRequest(`${healthCheck}/${message}`, 'GET')}
	},
	Mutation: {
		addItem: (_, {userId, item} ) => {
			// console.log(`userId: ${userId}, cartItemSimple: ${item}`)
			generalRequest(`${URL}/${userId}`, 'POST', item)},

		removeItem: (_, {userId, itemId} ) =>
			generalRequest(`${URL}/${userId}`, 'PATCH', itemId),
	}
};

export default resolvers;
