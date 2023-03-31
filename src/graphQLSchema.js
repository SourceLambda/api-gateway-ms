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

import profileResolvers from './profile/resolvers';
import postResolvers from './post_ms/resolvers';
import billResolvers from './placeOrder_ms/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
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
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		profileResolvers,
		postResolvers,
		billResolvers
	)
});
