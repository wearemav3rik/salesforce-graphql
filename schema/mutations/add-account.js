const {
  GraphQLNonNull
} = require('graphql')


const AccountType = require('../types/account')

const AccountInputType = require('../inputs/account-input')

module.exports = {
  type: AccountType,
  description: `
    mutation addOneAccount($input: AccountInput!) {
      AddAccount(input: $input) {
        Id
        Name
        SLA__c
        Description
        ExtId__c
      }
    }

    Sample query variable:

    {
      "input": {
        "Name": "Sample Name",
        "SLA__c": "Gold",
        "Description": "Sample Description"
      }
    }`,
  args: {
    input: { type: new GraphQLNonNull(AccountInputType) }
  },
  resolve: (obj, { input }, { salesforce }) => {
    return salesforce.createAccount(input)
  }
}