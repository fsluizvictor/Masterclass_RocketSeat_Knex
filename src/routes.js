const express = require('express')
const express = require('express')
const knex = require('./database')
const routes = express.Router()


routes.get('/users', (req, res) =>
    knex('users').then((results) =>
        res.json(results)))


module.exports = routes  