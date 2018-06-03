const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql')

const salesforce = require('../../database/salesforce')

module.exports = new GraphQLObjectType({
  name: 'Account',
  fields: () => {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      sla__c: { type: GraphQLString },
      description: { type: GraphQLString }
    }
  }
})