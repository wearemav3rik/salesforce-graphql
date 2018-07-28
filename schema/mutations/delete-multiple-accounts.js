const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql')


const AccountType = require('../types/account')

// const AccountInputType = require('../inputs/account-input')

module.exports = {
  type: GraphQLList(AccountType),
  args: {
    Ids: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) }
  },
  resolve: (obj, { Ids }, { salesforce }) => {
    return salesforce.deleteMultipleAccounts(Ids)
  }
}