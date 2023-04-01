import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities.js';

import {
	brandTypeDef,
	categoryTypeDef,
	itemTypeDef,
	cartItemTypeDef,
	cartTypeDef,
	cartQueries,
	cartMutations
} from './SourceLambda/cart/typeDefs.js';

import cartResolvers from './SourceLambda/cart/resolvers.js';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		brandTypeDef,
		categoryTypeDef,
		itemTypeDef,
		cartItemTypeDef,
		cartTypeDef
	],
	[
		cartQueries
	],
	[
		cartMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		cartResolvers
	)
});
