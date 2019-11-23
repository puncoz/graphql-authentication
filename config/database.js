"use strict"

require("dotenv")
    .config()

const config = {
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    operatorsAliases: false,
}

module.exports = {
    "development": config,
    "test": config,
    "production": config,
}
