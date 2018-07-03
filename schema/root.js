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
        resolve: (obj, args, { salesforce }) => {
          return "Hello World from Mav3rik!"
        }
      },
      Accounts: {
        type: new GraphQLList( AccountType ),
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccounts()
        }
      },
      AccountsById: {
        type: new GraphQLList( AccountType ),
        args: {
          Id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccountById(args.Id) 
        }
      },
      AccountsByName: {
        type: new GraphQLList( AccountType ),
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

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation type',
  fields: () => ({
    AddAccount: AddAccountMutation,
    UpdateAcconunt: UpdateAccountMutation,
    DeleteAccount: DeleteAccountMutation,
    UpsertAccountByExternalID: UpsertAccountMutation
  })
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

module.exports = rootSchema