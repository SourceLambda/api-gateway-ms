export const itemTypeDef = `
  type Item {
    itemId: ID!
    quantity: Int!
  }

  type ItemInfo {
    itemId: ID!
    name: String!
    price: Float!
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
  }
  
  type CartItems {
    items: [ItemInfo]!
  }`;

export const messageTypeDef = `
  type Message {
    message: String!
  }`;

export const cartQueries = `
    getCart(userId: ID!): Cart!
    getCartInfo(userId: ID!): CartItems!
    sendMessage(message: String!): Message!
    healthCheck: String!
  `;

export const cartMutations = `
    addItem(userId: ID!, item: ItemInput!): Cart
    removeItem(userId: ID!, item: RemoveItemInput!): Cart
    deleteCart(userId: ID!): Cart
    sendMessage(message: String!): Message!
  `;
