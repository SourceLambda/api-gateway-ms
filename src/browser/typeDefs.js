export const browserTypeDef = `
input PostToIndex {
	id: String!
	title: String!
	desc: String!
    category: String!
}
`

export const browserQueries = `
    browse(q: String!): [Post]!
`

export const browseMutations =`
index(post: PostToIndex!): String!
`
