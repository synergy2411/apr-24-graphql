# Break Timings

- Tea Break : 12:00 (15 Mins)
- Lunch Break : 1:30PM (45 Mins)
- Tea Break : 4:00PM (15 Minutes)

# GraphQL is defined specifications

- No Over-fetching
- No under-fetching
- Single Endpoint
- Flexible
- Better Alternate to REST
- Language independent
- Fast

- Over-fetching
  /books -> id, title, isbn, author, numOfPages etc
  id, title, author

- Under-fetching
  /books -> id, title, isbn, author, numOfPages etc
  /authors -> id, name, location, age

id , title, author, author_location, author_age

GraphQL Specs

- Schema : typeDefs, Resolvers
- context

- React -> fetch API, axios. jquery
- React -> @apollo/client

# Node Installer

- Node Package Manager (NPM)
- Node Runtime Environment (NRE)
- Node Native Modules (eg. http, events, utils, os, fs etc)

# GraphQL Server

- GraphQL
- GraphQL Yoga Server

# Steps to create graphql server

- npm init -y
  > Generates package.json file
- npm install graphql graphql-yoga
  > to create graphql server
- npm install nodemon -D

- npm install uuid

# to start nodemon

- npm run devStart

- node src/server.js

# Root Resolvers (built-in)

- Query
- Mutation
- Subscription
