export const brandTypeDef = `
  type Brand {
    id: String!
    name: String!
  }
`;

export const categoryTypeDef = `
  type Category {
    id: String!
    name: String!
  }       
`;

export const itemTypeDef = `
  type Item{
    id: String!
    name: String!
    description: String!
    price: Float!
    brand: Brand!
    category: Category!
  }

  input ItemInput {
    id: String!
  }
  `;

export const cartItemTypeDef = `
  type CartItem {
    item: Item!
    quantity: Int!
  }

  input CartItemInput {
    item: Item!
    quantity: Int!
  }`;


export const cartTypeDef = `
  type Cart {
    items: [CartItem]!
    total: Float!
  }
  `;

export const cartQueries = `
  getCart: Cart!
  `;

export const cartMutations = `
  addItem(item: CartItemInput!): Cart
  removeItem(item: ItemInput!): Cart
`;
