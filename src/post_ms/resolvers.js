import { generalRequest } from './utilities_post_ms.js';
import {host, port, countPostsEntryPoint, categoriesEntryPoint, postsEntryPoint, reviewsEntryPoint} from './server.js'

const URL = `http://${host}:${port}`;

const resolvers = {
	Query: {
		// categories query resolvers
		allCategories: (_ ) => 
			generalRequest(`${URL}/${categoriesEntryPoint}`, 'GET'),
		categoryById: (_, { ID } ) => 
			generalRequest(`${URL}/${categoriesEntryPoint}/${ID}`, 'GET'),
		// reviews query resolvers
		allReviews: (_, { page, postID }) => {
			let params;
			if (page && !postID) {
				params = `?page=${page}`
			}
			else if (!page && postID) {
				params = `?postID=${postID}`
			}
			else if (!page && !postID) {
				params = ""
			}
			return generalRequest(`${URL}/${reviewsEntryPoint}${params}`, 'GET')
		},
		reviewById: (_, { ID }) =>
			generalRequest(`${URL}/${reviewsEntryPoint}/${ID}`, 'GET'),
		// posts query resolvers
		allPosts: (_, { page, category }) => {
			let params;
			if (page && category) {
				params = `?category=${category}&page=${page}`
			}
			else if (page && !category) {
				params = `?page=${page}`
			}
			else if (!page && category) {
				params = `?category=${category}`
			}
			else {
				params = ""
			}
			return generalRequest(`${URL}/${postsEntryPoint}${params}`, 'GET')
		},
		postById: (_, { ID }) =>
			generalRequest(`${URL}/${postsEntryPoint}/${ID}`, 'GET'),
		countAllPost: (_ ) => 
			generalRequest(`${URL}/${countPostsEntryPoint}`, 'GET')
	},
	Mutation: {
		// reviews mutation resolvers
		createReview: (_, { review }) =>
			generalRequest(`${URL}/${reviewsEntryPoint}`, 'POST', review),
		updateReview: (_, { ID, review }) =>
			generalRequest(`${URL}/${reviewsEntryPoint}/${ID}`, 'PUT', review),
		deleteReview: (_, { ID, body }) =>
			generalRequest(`${URL}/${reviewsEntryPoint}/${ID}`, 'DELETE', body),
		// posts mutation resolvers
		createPost: (_, { post }) =>
			generalRequest(`${URL}/${postsEntryPoint}`, 'POST', post),
		updatePost: (_, { ID, post }) =>
			generalRequest(`${URL}/${postsEntryPoint}/${ID}`, 'PUT', post),
		deletePost: (_, { ID }) =>
			generalRequest(`${URL}/${postsEntryPoint}/${ID}`, 'DELETE'),
	}
};

export default resolvers;
