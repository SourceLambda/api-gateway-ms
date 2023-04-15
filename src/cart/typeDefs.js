export const itemTypeDef = `
type Item {
  itemId: ID!
  quantity: Int!
}

input RemoveItemInput {
  itemId: ID!
}

input ItemInput {
  itemId: ID!
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
    getCart(userId: ID!): Cart!
    sendMessage(message: String!): Message!
    healthCheck: String!
  `;

export const cartMutations = `
    addItem(userId: ID!, item: ItemInput!): Cart
    removeItem(userId: ID!, item: RemoveItemInput!): Cart
    deleteCart(userId: ID!): Cart
    sendMessage(message: String!): Message!
  `;
