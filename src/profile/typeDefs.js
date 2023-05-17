export const profileTypeDef = `
  type Profile {
      idProfile: String!
      firstname: String!
      lastname: String!
      telNumber: Float!
      email: String!
      password: String!
      birthday: String!
      alternativeNumber: Float!
      role: String!
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
    firstname: String!
    lastname: String!
    telNumber: Float!
    email: String!
    password: String!
    birthday: String!
    alternativeNumber: Float
    role: String!
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
      profileById(id: String!): Profile!
      cardsByProfileId(id_profile: String!): [Card]!
      addressessByProfileId(id_profile: String!): [Address]!
      cardFromProfileCards(id_profile: String!, id_card: Int!): Card!
      addressFromProfileAddresses(id_profile: String!, id_address: Int!): Address!
  `;

export const profileMutations = `
    createProfile(profile: ProfileInput!): Profile
    createCardToProfile(id_profile: String!, card: CardInput!): Card
    createAddressToProfile(id_profile: String!, address: AddressInput!): Address

    updateProfile(id_profile: String!, profile: ProfileInput!): Profile
    updateProfileAddress(id_address: Int!, address: AddressInput!): Address

    deleteProfile(id_profile: String!): Int
    deleteCard(id_profile: String!, id_card: Int!): Int
    deleteAddress(id_profile: String!, id_address: Int!): Int
`;
