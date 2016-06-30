/////////
// ENV //
/////////
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
// custom
var handler = require('./parse_request_handler').handler;
// var parse_carters = 

////////////
// ROUTES //
////////////

app.use(bodyParser.text({
  type: '*/*', 
  limit: '15mb'
}));
// app.use(bodyParser({limit: '50mb'}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/parse/:franchise', handler);

////////////
// SERVER //
////////////
app.listen(process.env.PORT || 4000);
console.log('Welcome to Onboardingthon!!!');