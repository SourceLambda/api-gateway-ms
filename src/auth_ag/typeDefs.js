// export const categoryTypeDef = `
//   type Category {
//       id: Int!
//       name: String!
//       description: String!
//   }
//   input CategoryInput {
//       name: String!
//       description: String!
//   }`;

// export const categoryQueries = `
//       allCategories: [Category]!
//       categoryById(id: Int!): Category!
//   `;

// export const categoryMutations = `
//     createCategory(category: CategoryInput!): Category!
//     updateCategory(id: Int!, category: CategoryInput!): Category!
//     deleteCategory(id: Int!): Int
// `;

export const userTypeDef=`
  type User{
    id: Int!
    email: String!
    password: String!
    role: String!
  }
  input UserInput{
    email: String!
    password: String!
    role: String!
  }
`;

export const userloginTypeDef=`
  type UserLogin{
    id: Int!
    email: String!
    role: String!
  }
  input UserLoginInput{
    email: String!
    password: String!
  }
`;

export const userRecoverTypeDef=`
  type UserRecover{
    id: Int!
    email: String!
    role: String!
  }
  input UserRecoverInput{
    email: String!
    password: String!
  }
`;

export const userQueries = `
  allUsers:[User]!
`;

export const userMutations =`
  createUser(user: UserInput!): JSON!
`;

export const userloginMutations=`
  loginUser(userlogin: UserLoginInput!):JSON!
`;

export const userRecoverMutations=`
  recoverUser(userRecover: UserRecoverInput!):JSON!
`;