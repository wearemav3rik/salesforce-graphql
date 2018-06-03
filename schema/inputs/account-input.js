const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'AccountInput',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    sla__c: { type: GraphQLString },
    description: { type: GraphQLString },
  }
})