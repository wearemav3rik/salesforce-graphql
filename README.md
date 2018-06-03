
<h1 align="center">Salesforce + GraphQL</h1>
<p align="center">☁︎ Building APIs with GraphQL and Salesforce</p>
<p align="center"><a href="https://travis-ci.com/Gurenax/graphql-node-nforce/"><img src="https://travis-ci.com/Gurenax/graphql-node-nforce.svg?branch=master"/></a>
</p>

---

## Blogs
- [Part 1: Building APIs with GraphQL and Salesforce](https://www.mav3rik.com/blog/salesforce-graphql)
- [Part 2: Building APIs with GraphQL and Salesforce](#)

## Preview
![](/docs/images/graphql.png)

---

## Getting Started
1. Download the project
```
git clone https://github.com/wearemav3rik/salesforce-graphql.git
```

2. Install the packages
```
yarn install
```

3. Start the GraphQL server
```
yarn start
```

4. Go to your browser and open `http://localhost:4000/graphql`

---

## Objectives
- Use nForce to integrate and perform queries with Salesforce
- Utilise existing patterns in the project: [Node nForce](https://github.com/Gurenax/node-nforce)
- Create an easy to use pattern for GraphQL and Salesforce
- Utilise these patterns as back-end for React and React Native salesforce projects


## Dependencies
### Environment Variables
- Use a .env file in your application's directory
```
CONSUMER_KEY = 
CONSUMER_SECRET = 
SALESFORCE_USERNAME = 
SALESFORCE_PASSWORD = 
SALESFORCE_SECURITY_TOKEN = 
```

### Libraries
- Run `yarn install` to install these dependencies:
  - [nforce](https://github.com/kevinohara80/nforce)
  - [node-nforce](https://github.com/Gurenax/node-nforce)
  - [GraphQl](https://github.com/graphql/graphql-js)
  - [Express GraphQL](https://github.com/graphql/express-graphql)
  - [dotenv](https://github.com/motdotla/dotenv)
  - [nodemon](https://github.com/remy/nodemon)
  - [jshint](https://github.com/jshint/jshint)

## Contributing
### Todos
- Integrate with composite API instead of using nForce
- Add more mutations
  - Create multiple accounts
  - Update multiple accounts
  - Delete multiple accounts
  - Upsert multiple accounts
- Use facebook dataloader to improve query scalability