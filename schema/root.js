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
      accounts: {
        type: new GraphQLList( AccountType ),
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccounts()
        }
      },
      accountsById: {
        type: new GraphQLList( AccountType ),
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccountById(args.id) 
        }
      },
      accountsByName: {
        type: new GraphQLList( AccountType ),
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (obj, args, { salesforce }) => {
          return salesforce.getAccountByName(args.name) 
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
    UpsertAccount: UpsertAccountMutation
  })
})

const rootSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

module.exports = rootSchema