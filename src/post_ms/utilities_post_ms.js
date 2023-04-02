import request from 'request-promise-native';

async function generalRequest(url, method, body) {
	
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
			
			body.Description = JSON.stringify(body.Description)
			
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
		const response = await request(parameters)
		
		if (method === 'GET' && url.match(/post([\/][1-9]+)$/)) {
			// GET /post/{id}
			
			response.Description = JSON.parse(response.Description)
			
			return response
		}
		if (method === 'GET') {
			// GET /post (all posts)
			
			response.forEach(postReturned => {
				postReturned.Description = JSON.parse(postReturned.Description)
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

export {
	generalRequest
}
