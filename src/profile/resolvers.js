import { generalRequest } from '../utilities';
import { url, port, entryPoint } from './server';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileById: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET'),

		cardsByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL}/profile/${id_profile}/cards`, 'GET'),

		addressessByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL}/profile/${id_profile}/addresses`, 'GET'),

		cardFromProfileCards: (_, { id_profile, id_card }) =>
			generalRequest(`${URL}/profile/${id_profile}/cards/${id_card}`, 'GET'),

		addressFromProfileAddresses: (_, { id_profile, id_address }) =>
			generalRequest(`${URL}/profile/${id_profile}/addresses/${id_address}`, 'GET'),
	},
	Mutation: {
		//create
		createProfile: (_, { profile }) =>
			generalRequest(`${URL}/profile`, 'POST', profile),

		createCardToProfile: (_, { id_profile, card }) =>
			generalRequest(`${URL}/profile/${id_profile}/card`, 'POST', card),

		createAddressToProfile: (_, { id_profile, address }) =>
			generalRequest(`${URL}/profile/${id_profile}/address`, 'POST', address),

 		updateProfile: (_, { id_profile, profile }) =>
			generalRequest(`${URL}/profile/${id_profile}`, 'PUT', profile),

 		updateProfileAddress: (_, { id_address, address }) =>
			generalRequest(`${URL}/address/${id_address}`, 'PUT', address),

		deleteProfile: (_, { id_profile }) =>
			generalRequest(`${URL}/profile/${id_profile}`, 'DELETE'),

		deleteAddress: (_, { id_profile, id_address }) =>
			generalRequest(`${URL}/profile/${id_profile}/addresses/${id_address}`, 'DELETE'),

		deleteCard: (_, { id_profile, id_card }) =>
			generalRequest(`${URL}/profile/${id_profile}/cards/${id_card}`, 'DELETE'),

		loginToProfile: (_, { credentials }) =>
			generalRequest(`${URL}/profile/login`, 'POST', credentials),
	}
};

export default resolvers;
