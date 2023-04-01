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

// type Definitions

const categoryTypeDef = `
type Category {
	ID: Int!
	Name: String!
	Parent_CategoryID: Int
}
`;

const reviewTypeDef = `
type Review {
	ID: Int!
	PostID: Int!
	User_name: String!
	User_email: String!
	Rating: Int!
	Review_text: String!
}
input ReviewInput {
	PostID: Int!
	User_name: String!
	User_email: String!
	Rating: Int!
	Review_text: String!
}
input UpdReviewBody {
	PostID: Int!
	User_name: String!
	User_email: String!
	Rating: Int!
	OldRating: Int!
	Review_text: String!
}
input DelReviewBody {
	PostID: Int!
	OldRating: Int!
}
`;


const postTypeDef = `
type Description {
	Description_text: String!
	Brand: String!
	Tech_details: [String]
	Other_details: [String]
}
input DescriptionInput {
	Description_text: String!
	Brand: String!
	Tech_details: [String]
	Other_details: [String]
}
type Post {
	ID: Int!
	Title: String!
	CategoryID: Int!
	Image: String!
	Description: Description!
	Creation_date: String!
	Units: Int!
	Price: Float!
	Sum_ratings: Int
	Num_ratings: Int
	Views: Int
}
input PostInput {
	Title: String!
	CategoryID: Int!
	Image: String!
	Description: DescriptionInput!
	Creation_date: String!
	Units: Int!
	Price: Float!
}
`;

// query and mutation typeDefs

const categoriesQueries = `
	allCategories: [Category]!
`;

const reviewQueries = `
	allReviews(page: Int!): [Review]!
	reviewById(ID: Int!): Review!
`;
const reviewMutations = `
	createReview(review: ReviewInput!): String!
	updateReview(ID: Int!, review: UpdReviewBody!): String!
	deleteReview(ID: Int!, body: DelReviewBody): String!
`;

const postQueries = `
	allPosts(page: Int!): [Post]!
	postById(ID: Int!): Post!
`;
const postMutations = `
	createPost(post: PostInput!): String!
	updatePost(ID: Int!, post: PostInput!): String!
	deletePost(ID: Int!): String!
`;

const typeDefsPostMS = [
	categoryTypeDef,
	reviewTypeDef,
	postTypeDef
].join('\n');

const queriesPostMS = [
	categoriesQueries,
	reviewQueries,
	postQueries
].join('\n');

const mutationsPostMS = [
	reviewMutations,
	postMutations
].join('\n');

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
      cardsByProfileId(id_profile: Int!): [Card]
      addressessByProfileId(id_profile: Int!): [Address]
  `;

const profileMutations = `
    createProfile(profile: ProfileInput!): Profile
    createCardToProfile(id_profile: Int!, card: CardInput!): Card
    createAddressToProfile(id_profile: Int!, address: AddressInput!): Address
`;

//Todo el modelo es solo lo que requiere el front-end para funcionar
const billTypeDef = `
  type Product {
      idProduct: Int!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
  }

  type Bill {
    idBill: Int!
    idCliente: Int!
    total: Float!
    date: String!
    user: String!
    state: String!
    products: [Product]!
  }


  input BillInput {
    idCliente: Int!
  }
  `;

const billQueries = `
  historyByClientId(idCliente: Int!): [Bill],
  allBills: [Bill],
  billById(idBill: Int!): Bill
  `;

const billMutations = `
  createBill(cliente: BillInput!): Bill!
  updateStateBill(idBill: Int!, state: String!): Bill!,
  deleteBill(idBill: Int!) : String
`;

const url = 'localhost'; //no olvidar cambiar a host.docker.internal cuando se despliegue en docker
const port = '9090';
const entryPoint = 'api';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		profileById: (_, { id }) =>
			generalRequest(`${URL}/profile/${id}`, 'GET'),

		cardsByProfileId: (_, { id_profile }) =>
			generalRequest(`${URL}/profile/${id_profile}/cards`, 'GET'),

		addressessByProfileId: (_, { id_profile }) =>
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

async function generalRequest$1(url, method, body) {
	
	try {
		
		// verify the address structure (host:port/resource/[{id} or ?={page}])
		if (!url.match(/:[\d]+\/[\w]+((([\/][1-9]+){0,1})|((\?p=[1-9]+){0,1}))$/)) {
			throw new Error(`Invalid request url: ${url}`)
		}
		
		// valid url, is a /post request?
		if (!url.match(/post/)) {
			// not /post request
			// normal return response

			const parameters = {
				method,
				uri: encodeURI(url),
				body,
				json: true
			};
			return await request(parameters)
		}
		
		// is a /post request
		if (method === 'POST' || method === 'PUT') {
			// special response, must stringify body.Description
			// POST /post or PUT /post/{id}
			
			body.Description = JSON.stringify(body.Description);
			body.Price = String(body.Price);
			
			const parameters = {
				method,
				uri: encodeURI(url),
				body,
				json: true
			};
			return await request(parameters)
		}
		
		// create the await response for all other cases
		const parameters = {
			method,
			uri: encodeURI(url),
			body,
			json: true
		};
		const response = await request(parameters);
		
		if (method === 'GET' && url.match(/post([\/][1-9]+)$/)) {
			// GET /post/{id}
			
			response.Description = JSON.parse(response.Description);
			response.Price = Number(response.Price.split("$")[1].replaceAll(',', ''));
			
			return response
		}
		if (method === 'GET') {
			// GET /post (all posts)
			
			response.forEach(postReturned => {
				postReturned.Description = JSON.parse(postReturned.Description);
				postReturned.Price = Number(postReturned.Price.split("$")[1].replaceAll(',', ''));
			});
			
			return response
		}
		// DELETE /post
		// no body modifications
		return response
	}
	catch (err) {
		return err
	}
}

const host = 'localhost';
const port$1 = '8080';

const categoriesEntryPoint = 'categories';
const postsEntryPoint = 'post';
const reviewsEntryPoint = 'review';

const URL$1 = `http://${host}:${port$1}`;

const resolvers$1 = {
	Query: {
		// categories query resolvers
		allCategories: (_ ) => 
			generalRequest$1(`${URL$1}/${categoriesEntryPoint}`, 'GET'),
		// reviews query resolvers
		allReviews: (_, { page }) => {
			const params = page ? `?p=${page}` : '';
			return generalRequest$1(`${URL$1}/${reviewsEntryPoint + params}`, 'GET')
		},
		reviewById: (_, { ID }) =>
			generalRequest$1(`${URL$1}/${reviewsEntryPoint}/${ID}`, 'GET'),
		// posts query resolvers
		allPosts: (_, { page }) => {
			const params = page ? `?p=${page}` : '';
			return generalRequest$1(`${URL$1}/${postsEntryPoint + params}`, 'GET')
		},
		postById: (_, { ID }) =>
			generalRequest$1(`${URL$1}/${postsEntryPoint}/${ID}`, 'GET')
	},
	Mutation: {
		// reviews mutation resolvers
		createReview: (_, { review }) =>
			generalRequest$1(`${URL$1}/${reviewsEntryPoint}`, 'POST', review),
		updateReview: (_, { ID, review }) =>
			generalRequest$1(`${URL$1}/${reviewsEntryPoint}/${ID}`, 'PUT', review),
		deleteReview: (_, { ID, body }) =>
			generalRequest$1(`${URL$1}/${reviewsEntryPoint}/${ID}`, 'DELETE', body),
		// posts mutation resolvers
		createPost: (_, { post }) =>
			generalRequest$1(`${URL$1}/${postsEntryPoint}`, 'POST', post),
		updatePost: (_, { ID, post }) =>
			generalRequest$1(`${URL$1}/${postsEntryPoint}/${ID}`, 'PUT', post),
		deletePost: (_, { ID }) =>
			generalRequest$1(`${URL$1}/${postsEntryPoint}/${ID}`, 'DELETE'),
	}
};

const url$1 = 'localhost'; //no olvidar cambiar a host.docker.internal cuando se despliegue en docker
const port$2 = '8000';
const entryPoint$1 = 'api';

const URL$2 = `http://${url$1}:${port$2}/${entryPoint$1}`;

const resolvers$2 = {
	Query: {
		historyByClientId: (_, { idCliente }) =>//historial de facturas de un cliente
			generalRequest(`${URL$2}/history/${idCliente}`, 'GET'),
		allBills: (_) =>//todas las facturas
			generalRequest(`${URL$2}/bill`, 'GET'),
		billById: (_, { idBill }) =>//una factura en especifico
			generalRequest(`${URL$2}/bill/${idBill}`, 'GET'),
	},
	Mutation: {
		createBill: (_, { idCliente }) =>
			generalRequest(`${URL$2}/bill`, 'POST', { "idCliente": 15,
			"date": "2023-05-11T12:30:00Z",
			"user": "aleja",
			"state": "Pendiente",
			"products": [
			  {
				"idProduct": 1,
				"name": "Papas",
				"description": "",
				"price": 23.4,
				"quantity": 10
			  },
			  {
				"idProduct": 3,
				"name": "Pescado",
				"description": "",
				"price": 25.4,
				"quantity": 4
			  }
			]}),
			updateStateBill: (_, { idBill, state }) =>
			generalRequest(`${URL$2}/bill/${idBill}`, 'PUT', { "idBill": idBill, "state": state }),
		deleteBill: (_, { idBill }) =>
			generalRequest(`${URL$2}/bill/${idBill}`, 'DELETE')
			
		
	

			/*

		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
			*/
	}
};

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
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
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
