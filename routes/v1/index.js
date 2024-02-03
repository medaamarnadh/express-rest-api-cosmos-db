var express = require('express');
var router = express.Router();

const usersRouter = require('./users')
const authRouter = require('./auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/auth',  authRouter);
router.use('/users', usersRouter);

module.exports = router;
