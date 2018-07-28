const {
  GraphQLNonNull,
  GraphQLList
} = require('graphql')


const AccountType = require('../types/account')

const AccountInputType = require('../inputs/account-input')

module.exports = {
  type: GraphQLList(AccountType),
  args: {
    input: { type: new GraphQLNonNull(new GraphQLList(AccountInputType)) }
  },
  resolve: (obj, { input }, { salesforce }) => {
    return salesforce.createMultipleAccounts(input)
  }
}