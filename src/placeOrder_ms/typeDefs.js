//Todo el modelo es solo lo que requiere el front-end para funcionar
export const billTypeDef = `
  type Product {
      idProduct: Int!
        name: String!
        price: Float!
        quantity: Int!
  }


  input ProductInput {
      idProduct: Int!
        name: String!
        price: Float!
        quantity: Int!
  }
  type Bill {
    idBill: Int!
    idCliente: String!
    total: Float!
    date: String!
    user: String!
    state: String!
    products: [Product]!
  }


  input BillInput {
    idCliente: String!
    date: String!
    user: String!
    state: String!
    products: [ProductInput]!
  }
  `;

export const billQueries = `
  historyByClientId(idCliente: String!): [Bill],
  allBills: [Bill],
  billById(idBill: Int!): Bill
  `;

export const billMutations = `
  createBill(idCliente:String! ,name:String ): Bill!
  updateStateBill(idBill: Int!, state: String!): Bill!
  deleteBill(idBill: Int!) : String
`;
