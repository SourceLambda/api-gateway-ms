export const itemTypeDef = `
  type Item {
    itemId: String!
    quantity: Int!
  }

  input ItemInput {
    itemId: String!
    quantity: Int!
  }
`;

export const cartTypeDef = `
  type Cart {
    items: [Item]!
  }
`;

export const messageTypeDef = `
  type Message {
    message: String!
  }`;

export const cartQueries = `
  getCart(userId: String!): Cart!
  healthCheck: String
  sendMessage(message: String!): Message
`;

export const cartMutations = `
  addItem(userId: String!, item: ItemInput!): Cart
  removeItem(userId: String!, itemId: String!): Cart
`;
