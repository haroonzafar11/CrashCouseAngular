const express = require('express');
const router = express.Router();
const authenticate = require('./middleware/middleware');

function routes() {
  const users = require('./routes/users.route');
  const authentication = require('./routes/authentication.route');

  
  router.use('/users',authenticate,users);
  router.use('/authentication',authentication);
  
    
  return router;
  }
  
  module.exports = routes();
  