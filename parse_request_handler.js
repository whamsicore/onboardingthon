var exports = module.exports; 

// Load Jquery
var custom_parsers = require('./parsers/main');
var jquery = require('jquery');
var jsdom = require('jsdom');

var handler = function (req, res) {
  console.log('@parse_carters endpoint');
  // console.log('@parse_carters req.body = ', req.body);
  var $ = null;
  var html = req.body; 

  jsdom.env(
    html,
    function (err, window) {
      $ = require('jquery')(window);
      // console.log('testing body string = ', $('body').text().split());
      // console.log('-------------------------------------------');
      // console.log('-------------------------------------------');

      var franchise = req.params.franchise;
      console.log('test, franchise = ', franchise);
      res.send(custom_parsers[franchise]($));
  }); // jsdom.env
} // handler

exports.handler = handler;
