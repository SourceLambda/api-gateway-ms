import { generalRequest, getRequest, getCartInfoRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}`;

const resolvers = {
	Query: {
		healthCheck: (_) =>
			generalRequest(`${URL}/health`, 'GET'),

		sendMessage: (_, { message }) => 
			generalRequest(`${URL}/health/${message}`, 'GET'),

		getCart: (_, {userId}) => 
			generalRequest(`${URL}/cart/${userId}`, 'GET'),

		getCartInfo: (_, {userId}) => 
			getCartInfoRequest(userId)

	},
	Mutation: {
		sendMessage: (_, { message }) => 
			generalRequest(`${URL}/health/${message}`, 'GET'),	

		addItem: (_, {userId, item}) => 
			generalRequest(`${URL}/cart/${userId}`, 'POST', item),

		removeItem: (_, {userId, item}) =>
			generalRequest(`${URL}/cart/${userId}`, 'PATCH', item),

		deleteCart: (_, {userId}) =>
			generalRequest(`${URL}/cart/${userId}`, 'DELETE')
	}
};

export default resolvers;
