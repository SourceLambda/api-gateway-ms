//Todo el modelo es solo lo que requiere el front-end para funcionar
export const billTypeDef = `
  type Product {
      idProduct: Int!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
  }


  input ProductInput {
      idProduct: Int!
        name: String!
        description: String!
        price: Float!
        quantity: Int!
  }
  type Bill {
    idBill: Int!
    idCliente: Int!
    total: Float!
    date: String!
    user: String!
    state: String!
    products: [Product]!
  }


  input BillInput {
    idCliente: Int!
    date: String!
    user: String!
    state: String!
    products: [ProductInput]!
  }
  `;

export const billQueries = `
  historyByClientId(idCliente: Int!): [Bill],
  allBills: [Bill],
  billById(idBill: Int!): Bill
  `;

export const billMutations = `
  createBill(BillTemplate: BillInput!): Bill!
  updateStateBill(idBill: Int!, state: String!): Bill!,
  deleteBill(idBill: Int!) : String
`;
