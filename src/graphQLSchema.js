import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	categoryMutations,
	categoryQueries,
	categoryTypeDef
} from './swarch2023i/categories/typeDefs';

import {
	billMutations,
	billQueries,
	billTypeDef
} from './placeOrder_ms/typeDefs';

import categoryResolvers from './swarch2023i/categories/resolvers';
import billResolvers from './placeOrder_ms/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		billTypeDef
	],
	[
		categoryQueries,
		billQueries
	],
	[
		categoryMutations,
		billMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		billResolvers
	)
});
