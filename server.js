/////////
// ENV //
/////////
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var parser = require("./parser.js");
// var parse_carters = 

////////////
// ROUTES //
////////////

app.use(bodyParser.text({type: '*/*'}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/parse_carters', parser.parser);

////////////
// SERVER //
////////////
app.listen(4000);
console.log('Welcome to Onboardingthon!!!');