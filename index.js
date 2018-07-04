// Express
const express = require('express')
const assert = require('assert')

// Express-graphql
const graphqlHTTP = require('express-graphql')
// Import root schema
const rootSchema = require('./schema/root')

// Initialise express
const server = express()
const PORT = process.env.PORT || 4000

// Initialise dotenv
require('dotenv').config()

// Initialise jsforce and connection parameters for Salesforce Connected App
const { connectToOrg } = require('./lib/jsforce')
const org = connectToOrg({
  clientId: process.env.CONSUMER_KEY,
  clientSecret: process.env.CONSUMER_SECRET,
  redirectUri: 'https://localhost:3000/oauth/_callback'
})
const salesforceContext = require('./database/salesforce')(org)

// Authenticate to salesforce
org.login(
  process.env.SALESFORCE_USERNAME,
  process.env.SALESFORCE_PASSWORD+process.env.SALESFORCE_SECURITY_TOKEN
).then(response => {
  // GraphQL middleware
  server.use('/graphql', (req, res) => {
    // TODO: Use facebook dataloader to cache queries
    graphqlHTTP({
      schema: rootSchema,
      graphiql: true,
      context: { salesforceContext }
    })(req, res)
  })
}).catch(error => {
  assert.equal(error, null)
})

// Error handler
server.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Start the server
server.listen(PORT, error => {
  assert.equal(error, null)
  console.log(`GraphQL server started at ${PORT}`)
})