"use strict"

require("dotenv")
    .config()

const express = require("express")
const bodyParser = require("body-parser")
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./schema/typeDefs")
const resolvers = require("./schema/resolvers")
const jwt = require("express-jwt")

const app = express()

const authMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
})

app.use(authMiddleware)

const server = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req }) => ({
        user: req.user,
    }),
})

server.applyMiddleware({ app })

const port = process.env.APP_PORT
app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
})
