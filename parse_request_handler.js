/////////////////////
// REQUEST HANDLER //
/////////////////////

// Load Jquery
var custom_parsers = require('./parsers/main');
var jquery = require('jquery');
var jsdom = require('jsdom');

exports.handler = function (req, res) {
  var html = req.body; 
  
  jsdom.env(
    html,
    function (err, window) {
      var $ = require('jquery')(window);
      var franchise = req.params.franchise;
      console.log('test, franchise = ', franchise);
      res.send(custom_parsers[franchise]($));
  }); // jsdom.env
} // handler