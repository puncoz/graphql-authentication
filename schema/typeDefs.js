"use strict"

const { gql } = require("apollo-server-express")

const typeDefs = gql`
    directive @isAdmin on FIELD_DEFINITION
    directive @Auth on FIELD_DEFINITION

    type User {
        id: Int!
        username: String!
        email: String!
        isAdmin: Boolean!
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        me: User @Auth
        allUsers: [User]! @isAdmin
        post(id: Int!): Post @Auth
    }

    type Mutation {
        signup (username: String!, email: String!, password: String!): String
        login (username: String!, password: String!): String
        createPost(title: String!, content: String!): Post @Auth
        editPost(id: Int!, title: String, content: String): Post @Auth
    }
`

module.exports = typeDefs
