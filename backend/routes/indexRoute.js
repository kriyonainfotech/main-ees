const express = require('express')

const routes = express.Router();

routes.use('/',require('../routes/authRoute'))
routes.use('/admin',require('../routes/adminRoute'))

module.exports = routes;