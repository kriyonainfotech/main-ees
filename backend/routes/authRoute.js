const express = require('express');
const { register, login, logout, users } = require('../controllers/authController');

const routes = express.Router();


routes.post('/register',register);
routes.post('/login',login );
routes.get('/users',users );
routes.post('/logout',logout );

module.exports = routes


