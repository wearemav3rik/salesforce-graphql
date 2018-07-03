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

// Initialise nForce and connection parameters for Salesforce Connected App
const nforce = require('nforce')
const org = nforce.createConnection({
  clientId: process.env.CONSUMER_KEY,
  clientSecret: process.env.CONSUMER_SECRET,
  redirectUri: 'https://localhost:3000/oauth/_callback',
  environment: 'production',
  mode: 'single'
})
const salesforce = require('./database/salesforce')(org)

// Authenticate to salesforce using single user mode
org.authenticate(
  {
    username: process.env.SALESFORCE_USERNAME,
    password: process.env.SALESFORCE_PASSWORD,
    securityToken: process.env.SALESFORCE_SECURITY_TOKEN
  },
  (error, response) => {
    assert.equal(error, null)
    // GraphQL middleware
    server.use('/graphql', (req, res) => {
      // TODO: Use facebook dataloader to cache queries
      graphqlHTTP({
        schema: rootSchema,
        graphiql: true,
        context: { salesforce }
      })(req, res)
    })
  }
)

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