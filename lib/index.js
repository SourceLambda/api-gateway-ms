'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const profileTypeDef = `
  type Profile {
      idProfile: Int!
      firstname: String!
      lastname: String!
      telNumber: Int!
      email: String!
      password: String!
      birthday: String!
  }

  type Card {
    idCard: Int!
    cardNumber: Float!
    expirationDate: String!
    cvv: Int!
    cardName: String!
    cardNickname: String!
  }

  type Address {
    idAddress: Int!
    address: String!
    detailAddress: String!
  }

  input ProfileInput {
    idProfile: Int!
    firstname: String!
    lastname: String!
    telNumber: Int!
    email: String!
    password: String!
    birthday: String!
  }
  
  input CardInput {
    cardNumber: Float!
    expirationDate: String!
    cvv: Int!
    cardName: String!
    cardNickname: String!
  }

  input AddressInput {
    address: String!
    detailAddress: String!
  }
  `;

const profileQueries = `
      profileById(id: Int!): Profile!
      cardByProfileId(id_profile: Int!): [Card]
      addressByProfileId(id_profile: Int!): [Address]
  `;

const profileMutations = `
    createProfile(profile: ProfileInput!): Profile!
    createCardToProfile(id_profile: Int!, card: CardInput!): Card!
    createAddressToProfile(id_profile: Int!, address: AddressInput!): Address!
`;

const url$1 = 'localhost'; //no olvidar cambiar a host.docker.internal cuando se despliegue en docker
const port$1 = '9090';
const entryPoint$1 = 'api';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$2 = {
	Query: {
		profileById: (_, { id }) =>
			generalRequest(`${URL$1}/profile/${id}`, 'GET'),

		cardsByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL$1}/profile/${id_profile}/cards`, 'GET'),

		addressesByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL$1}/profile/${id_profile}/addresses`, 'GET'),
	},
	Mutation: {
		//create
		createProfile: (_, { profile }) =>
			generalRequest(`${URL$1}/profile`, 'POST', profile),

		createCardToProfile: (_, { id_profile, card }) =>
			generalRequest(`${URL$1}/profile/${id_profile}/card`, 'POST', card),

		createAddressToProfile: (_, { id_profile, address }) =>
			generalRequest(`${URL$1}/profile/${id_profile}/address`, 'POST', address),

/* 		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE') */
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		profileTypeDef
	],
	[
		profileQueries
	],
	[
		profileMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers$2
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
