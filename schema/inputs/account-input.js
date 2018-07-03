const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'AccountInput',
  fields: {
    Id: { type: GraphQLID },
    Name: { type: GraphQLString },
    SLA__c: { type: GraphQLString },
    Description: { type: GraphQLString },
    ExtId__c: {type: GraphQLString }
  }
})