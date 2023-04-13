export const itemTypeDef = `
type Item {
  itemId: ID!
  quantity: Int!
}

input ItemInput {
  id: ID!
  quantity: Int!
}`;

export const cartTypeDef = `
  type Cart {
    items: [Item]!
  }`;

export const messageTypeDef = `
  type Message {
    message: String!
  }`;

export const cartQueries = `
    getCart(userId: ID!): [Item]!
    sendMessage(message: String!): Message!
    healthCheck: String!
  `;

export const cartMutations = `
    sendMessage(message: String!): Message!
  `;
