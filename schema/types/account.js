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
      Id: { type: GraphQLID },
      Name: { type: GraphQLString },
      SLA__c: { type: GraphQLString },
      Description: { type: GraphQLString },
      ExtId__c: {type: GraphQLString }
    }
  }
})