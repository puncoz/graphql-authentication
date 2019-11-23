"use strict"

require("dotenv")
    .config()

const { User } = require("../models")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const generateToken = ({ id, email }) => jsonwebtoken.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1y" })

const resolvers = {
    Query: {
        me: async (_, args, { user }) => {
            if (!user) {
                throw new Error("Unauthenticated")
            }

            console.log(user)

            return await User.findOne({ where: { id: user.id } })
        },
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            const user = User.create({
                username, email,
                password: await bcrypt.hash(password, 10),
            })

            return generateToken({ id: user.id, email: user.email })
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

            return generateToken({ id: user.id, email: user.email })
        },
    },
}

module.exports = resolvers
