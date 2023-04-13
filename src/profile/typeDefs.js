export const profileTypeDef = `
  type Profile {
      idProfile: Int!
      firstname: String!
      lastname: String!
      telNumber: Int!
      email: String!
      password: String!
      birthday: String!
      alternativeNumber: Int!
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
    alternativeNumber: Int
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
      cardsByProfileId(id_profile: Int!): [Card]!
      addressessByProfileId(id_profile: Int!): [Address]!
      cardFromProfileCards(id_profile: Int!, id_card: Int!): Card!
      addressFromProfileAddresses(id_profile: Int!, id_address: Int!): Address!
  `;

export const profileMutations = `
    createProfile(profile: ProfileInput!): Profile
    createCardToProfile(id_profile: Int!, card: CardInput!): Card
    createAddressToProfile(id_profile: Int!, address: AddressInput!): Address

    updateProfile(id_profile: Int!, profile: ProfileInput!): Profile
    updateProfileAddress(id_address: Int!, address: AddressInput!): Address

    deleteProfile(id_profile: Int!): Int
    deleteCard(id_profile: Int!, id_card: Int!): Int
    deleteAddress(id_profile: Int!, id_address: Int!): Int
`;
