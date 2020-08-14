var express = require('express');
var router = express.Router();

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'tano-api',
    password: 'tano',
    port: 5432,
});
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  res.json({name:'tano'});
});

router.get('/contacts', function(req, res, next) {
  client.connect()
  client.query('SELECT * from getcontact()')
  .then(result => res.json(result.rows))
  .catch(error => console.log(error));
})

module.exports = router;
