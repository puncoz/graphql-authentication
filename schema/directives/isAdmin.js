"use strict"

const { SchemaDirectiveVisitor } = require("apollo-server-express")
const { defaultFieldResolver } = require("graphql")

class IsAdminDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field, details) {
        const { resolve = defaultFieldResolver } = field

        field.resolve = async (...args) => {
            // extract user from context
            const { user } = args[2]

            if (!user) {
                throw new Error("Unauthenticated")
            }

            if (!user.is_admin) {
                throw new Error("Permission Denied, Admin only!")
            }

            return resolve.apply(this, args)
        }
    }
}

module.exports = IsAdminDirective
