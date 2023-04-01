import { generalRequest, getRequest } from '../../utilities.js';
import { url, port, entryPoint } from './server.js';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		getCart: (_, {userId} ) =>
			getRequest(`${URL}/cart/${userId}`, 'GET')
	},
	Mutation: {
		addItem: (_, {userId, cartItem} ) =>
			generalRequest(`${URL}/cart/${userId}`, 'POST', cartItem),
		removeItem: (_, {userId, item} ) =>
			generalRequest(`${URL}/cart/${userId}/${item}`, 'PATCH')
	}
};

export default resolvers;
