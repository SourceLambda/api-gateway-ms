import { generalRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileById: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET'),

		cardsByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL}/profile/${id_profile}/cards`, 'GET'),

		addressesByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL}/profile/${id_profile}/addresses`, 'GET'),
	},
	Mutation: {
		//create
		createProfile: (_, { profile }) =>
			generalRequest(`${URL}/profile`, 'POST', profile),

		createCardToProfile: (_, { id_profile, card }) =>
			generalRequest(`${URL}/profile/${id_profile}/card`, 'POST', card),

		createAddressToProfile: (_, { id_profile, address }) =>
			generalRequest(`${URL}/profile/${id_profile}/address`, 'POST', address),

/* 		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE') */
	}
};

export default resolvers;
