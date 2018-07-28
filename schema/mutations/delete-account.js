const {
  GraphQLNonNull,
  GraphQLID
} = require('graphql')


const AccountType = require('../types/account')

// const AccountInputType = require('../inputs/account-input')

module.exports = {
  type: AccountType,
  args: {
    Id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: (obj, args, { salesforce }) => {
    return salesforce.deleteAccount(args.Id)
  }
}