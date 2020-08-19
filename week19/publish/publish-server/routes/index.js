var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.post('/', function(request, res, next) {
  request.on('data', data => {
    console.log('\n//////', data)
  })
  fs.writeFileSync('../server/public/' + request.query.filename, request.body.msg);
  res.send('');
  res.end();
});

module.exports = router;
