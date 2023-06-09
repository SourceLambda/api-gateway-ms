import request from 'request-promise-native';
import { formatError } from 'graphql';
import { host as hostP, port as portP} from './post_ms/server.js';
import { url as hostC, port as portC } from './cart/server.js';

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
export async function generalRequest(url, method, body, fullResponse) {
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
		const res = await request(parameters);

		// console.log(`The response is:\n ${JSON.stringify(res)}`);

		return res;

	} catch (err) {
		return err;
	}
}

export async function getCartInfoRequest(urlCart) {

	try {

		const URLP = `http://${hostP}:${portP}`;
		const URLC = `http://${hostC}:${portC}`;

		const cart = await generalRequest(`${URLC}/cart/${urlCart}`, 'GET');

		const itemPromises = cart.items.map( async (item) => {
			const itemDetails = await generalRequest(`${URLP}/post/${item.itemId}`, 'GET');

			return { 
				itemId: item.itemId,
				name: itemDetails.Title,
				price: itemDetails.Price,
				quantity: item.quantity,
			};
		});

		const res = await Promise.all(itemPromises);
		return {"items" : res};

	} catch (err) {
		return err;
	}
};

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
export function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
export function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
export function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

export function formatErr(error) {
	const data = formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}
