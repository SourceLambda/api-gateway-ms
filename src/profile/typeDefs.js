export const profileTypeDef = `
  type Profile {
      idProfile: Int!
      firstname: String!
      lastname: String!
      telNumber: Int!
      email: String!
      password: String!
      birthday: String!
  }

  type Card {
    idCard: Int!
    cardNumber: Float!
    expirationDate: String!
    cvv: Int!
    cardName: String!
    cardNickname: String!
  }

  type Address {
    idAddress: Int!
    address: String!
    detailAddress: String!
  }

  input ProfileInput {
    idProfile: Int!
    firstname: String!
    lastname: String!
    telNumber: Int!
    email: String!
    password: String!
    birthday: String!
  }
  
  input CardInput {
    cardNumber: Float!
    expirationDate: String!
    cvv: Int!
    cardName: String!
    cardNickname: String!
  }

  input AddressInput {
    address: String!
    detailAddress: String!
  }
  `;

export const profileQueries = `
      profileById(id: Int!): Profile!
      cardsByProfileId(id_profile: Int!): [Card]
      addressessByProfileId(id_profile: Int!): [Address]
  `;

export const profileMutations = `
    createProfile(profile: ProfileInput!): Profile
    createCardToProfile(id_profile: Int!, card: CardInput!): Card
    createAddressToProfile(id_profile: Int!, address: AddressInput!): Address
`;
