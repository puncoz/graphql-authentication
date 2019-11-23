"use strict"

require("dotenv")
    .config()

const { User, Post } = require("../models")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const generateToken = user => jsonwebtoken.sign({ id: user.id, email: user.email, is_admin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: "1y" })

const resolvers = {
    Query: {
        me: async (_, args, { user }) => {
            return User.findByPk(user.id)
        },

        allUsers: async (_, args, { user }) => {
            return User.findAll()
        },

        post: async (_, { id }, { user }) => {
            return Post.findByPk(id)
        },
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            const user = User.create({
                username, email,
                password: await bcrypt.hash(password, 10),
                is_admin: 0,
            })

            return generateToken(user)
        },

        login: async (_, { username, password }) => {
            const user = await User.findOne({ where: { username } })

            if (!user) {
                throw new Error("Invalid login")
            }

            const valid = await bcrypt.compare(password, user.password)
            if (!valid) {
                throw new Error("Invalid login")
            }

            return generateToken(user)
        },

        createPost: async (_, { title, content }, { user }) => {
            return Post.create({
                title, content,
                user_id: user.id,
            })
        },

        editPost: async (_, { id, title, content }, { user }) => {
            const post = Post.findByPk(id)
            if (!post) {
                throw new Error("Post not found.")
            }

            if (post.user_id !== user.id) {
                throw new Error("Permission denied")
            }

            await post.update({ title, content })

            return post
        },
    },

    Post: {
        author: async (post) => {
            return User.findByPk(post.user_id)
        },
    },
}

module.exports = resolvers
