// type Definitions

const categoryTypeDef = `
type Category {
	ID: Int!
	Name: String!
	Parent_CategoryID: Int
}
`

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
`

const reviewQueries = `
	allReviews(page: Int, postID: Int): [Review]!
	reviewById(ID: Int!): Review!
`;
const reviewMutations = `
	createReview(review: ReviewInput!): String!
	updateReview(ID: Int!, review: UpdReviewBody!): String!
	deleteReview(ID: Int!, body: DelReviewBody!): String!
`;

const postQueries = `
	allPosts(page: Int, category: Int): [Post]!
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
].join('\n')

const queriesPostMS = [
	categoriesQueries,
	reviewQueries,
	postQueries
].join('\n')

const mutationsPostMS = [
	reviewMutations,
	postMutations
].join('\n')

export {
	typeDefsPostMS,
	queriesPostMS,
	mutationsPostMS	
}
