import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
<<<<<<< HEAD
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

import profileResolvers from './profile/resolvers';
import postResolvers from './post_ms/resolvers';
import billResolvers from './placeOrder_ms/resolvers';
=======
	messageTypeDef,
	itemTypeDef,
	cartTypeDef,
	cartQueries,
	cartMutations
	
} from './cart/typeDefs';

import cartResolvers from './cart/resolvers';
>>>>>>> shopping_cart_ms

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
<<<<<<< HEAD
		profileTypeDef,
		typeDefsPostMS,
		billTypeDef
	],
	[
		profileQueries,
		queriesPostMS,
		billQueries
	],
	[
		profileMutations,
		mutationsPostMS,
		billMutations
=======
		messageTypeDef,
		itemTypeDef,
		cartTypeDef
	],
	[
		cartQueries
	],
	[
		cartMutations
>>>>>>> shopping_cart_ms
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
<<<<<<< HEAD
		profileResolvers,
		postResolvers,
		billResolvers
=======
		cartResolvers
>>>>>>> shopping_cart_ms
	)
});
