"use strict"

require("dotenv")
    .config()

const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const jwt = require("express-jwt")
const typeDefs = require("./schema/typeDefs")
const resolvers = require("./schema/resolvers")
const isAdminDirective = require("./schema/directives/isAdmin")
const AuthDirective = require("./schema/directives/Auth")

const port = process.env.APP_PORT
const graphqlUrl = process.env.GRAPHQL_URL
const app = express()

const authMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
})

app.use(authMiddleware)

const server = new ApolloServer({
    typeDefs, resolvers,
    schemaDirectives: {
        isAdmin: isAdminDirective,
        Auth: AuthDirective,
    },
    context: ({ req }) => ({
        user: req.user,
    }),
})
server.applyMiddleware({ app, path: graphqlUrl })

app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
})
