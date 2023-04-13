import { generalRequest, getRequest } from '../utilities';
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

	},
	Mutation: {
		sendMessage: (_, { message }) => 
			generalRequest(`${URL}/health/${message}`, 'GET'),	
	}
};

export default resolvers;
