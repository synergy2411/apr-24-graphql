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
- npm install graphql-import-files

# to start nodemon

- npm run devStart

- node src/server.js

# Root Resolvers (built-in)

- Query
- Mutation
- Subscription

# NoSQL Database

- Column-based : Cassendra
- Key-value pair based : Redis
- Graph based : NeoJ
- Document based : MongoDB

---

# MongoDB Operations

- Create - insertOne, insertMany
- Read - find, findOne
- Update - updateOne, updateMany
- delete - deleteOne, deleteMany

mongodb+srv://testuser:ZQE8ftFsAEYgLXNG@mydemocluster.wj9wi9m.mongodb.net/?retryWrites=true&w=majority&appName=MyDemoCluster

# Local MongoDB Deployment URI

- mongodb://localhost:27017

# Primsa - ORM Tool for GraphQL

- npm init -y
- npm install graphql graphql-yoga

- npx prisma init
- npx prisma db push
- npm install @prisma/client
- npm install bcryptjs
- npm install jsonwebtoken

# Frontend Application

- npx create-react-app frontend
- npm install bootstrap
- npm install @apollo/client graphql
