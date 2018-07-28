const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query type',
  fields: () => {
    const AccountType = require('./types/account')
    return {
      hello: {
        type: GraphQLString,
        description: `
        query hello {
          hello
        }`,
        resolve: (obj, args, { salesforce }) => {
          return "Hello World from Mav3rik!"
        }
      },
      Accounts: {
        type: new GraphQLList( AccountType ),
        description: `
        query getAllAccounts {
          Accounts {
            Id
            Name
            SLA__c
            Description
            ExtId__c
          }
        }`,
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccounts()
        }
      },
      AccountsById: {
        type: new GraphQLList( AccountType ),
        description: `
        query getOneAccountById($Id: ID!) {
          AccountsById(Id: $Id) {
            Id
            Name
            SLA__c
            Description
            ExtId__c
          }
        }`,
        args: {
          Id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccountById(args.Id) 
        }
      },
      AccountsByName: {
        type: new GraphQLList( AccountType ),
        description: `
        query getOneAccountByName($Name: String!) {
          AccountsByName(Name: $Name) {
            Id
            Name
            SLA__c
            Description
            ExtId__c
          }
        }`,
        args: {
          Name: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccountByName(args.Name) 
        }
      }
    }
  }
})

const AddAccountMutation = require('./mutations/add-account')
const UpdateAccountMutation = require('./mutations/update-account')
const DeleteAccountMutation = require('./mutations/delete-account')
const UpsertAccountMutation = require('./mutations/upsert-account')
const AddMultipleAccountMutation = require('./mutations/add-multiple-accounts')
const UpdateMultipleAccountMutation = require('./mutations/update-multiple-accounts')
const DeleteMultipleAccountMutation = require('./mutations/delete-multiple-accounts')
const UpsertMultipleAccountMutation = require('./mutations/upsert-multiple-accounts')

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation type',
  fields: () => ({
    AddAccount: AddAccountMutation,
    UpdateAcconunt: UpdateAccountMutation,
    DeleteAccount: DeleteAccountMutation,
    UpsertAccountByExternalID: UpsertAccountMutation,
    AddMultipleAccountMutation: AddMultipleAccountMutation,
    UpdateMultipleAccountMutation: UpdateMultipleAccountMutation,
    DeleteMultipleAccountMutation: DeleteMultipleAccountMutation,
    UpsertMultipleAccountMutation: UpsertMultipleAccountMutation
  })
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

module.exports = rootSchema