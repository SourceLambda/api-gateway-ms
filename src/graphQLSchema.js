import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	typeDefsPostMS,
	queriesPostMS,
	mutationsPostMS
} from './post_ms/typeDefs.js';

import { profileQueries, profileMutations, profileTypeDef } from './profile/typeDefs';

import {
	billMutations,
	billQueries,
	billTypeDef
} from './placeOrder_ms/typeDefs';

import { messageTypeDef,
	itemTypeDef,
	cartTypeDef,
	cartQueries,
	cartMutations
	
} from './cart/typeDefs';

import {
	browserQueries
} from './browser/typeDefs';

import {
	userTypeDef,
	userQueries,
	userMutations,

	userloginTypeDef,
	userloginMutations
} from './auth_ag/typeDefs';

import cartResolvers from './cart/resolvers';
import profileResolvers from './profile/resolvers';
import postResolvers from './post_ms/resolvers';
import billResolvers from './placeOrder_ms/resolvers';
import BrowserResolvers from './browser/resolvers';
import userResolvers from './auth_ag/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		profileTypeDef,
		typeDefsPostMS,
		billTypeDef,
		messageTypeDef,
		itemTypeDef,
		cartTypeDef,
		userTypeDef,
		userloginTypeDef
	],
	[
		profileQueries,
		queriesPostMS,
		billQueries,
		cartQueries,
		browserQueries,
		userQueries
	],
	[
		profileMutations,
		mutationsPostMS,
		billMutations,
		cartMutations,
		userMutations,
		userloginMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		profileResolvers,
		postResolvers,
		billResolvers,
		cartResolvers,
		BrowserResolvers,
		userResolvers
	)
});
