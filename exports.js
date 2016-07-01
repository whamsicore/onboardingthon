
var custom_parsers = require('./parsers/main');
var jquery = require('jquery')
var jsdom = require('jsdom')

exports.parser_handler = function(event, context, callback) {
    var html = event.body;
    var franchise = event.franchise;

    jsdom.env(
        html,
        function (err, window) {
            var $ = require('jquery')(window);
            callback(null, custom_parsers[franchise]($));
        }
    ); // jsdom.env
}