var exports = module.exports;
// Load Jquery

var jquery = require('jquery');
var jsdom = require('jsdom');

var parser = function (req, res) {
  console.log('@parse_carters endpoint');
  // console.log('@parse_carters req.body = ', req.body);
  var $ = null;
  var html = req.body; 
  
  jsdom.env(
    html,
    function (err, window) {
      $ = require('jquery')(window);
      /////////////
      // ORDERNUMBER //
      /////////////
      try{
          var order_number = $('body').text().match(/order number is ([^\.\s]+)/)[1];    
      }catch(err){}

      try{
          var order_number = $('body').text().match(/Your order #([^\.\s]+)/)[1];    
      }catch(err){}

      /////////////
      // PRODUCT //
      /////////////
      var products = [];
      var rows = $('img[height=75]').closest('tr'); 

      rows.get().forEach(function(item){
          var image_url = $(item).find('img').eq(0).attr('src');
          var attr_cont = $(item).find('td'); 
          var attr_span = attr_cont.find('span');
          
          var attr_obj = {
              image_url: image_url, 
              title: attr_span.eq(0)[0].innerHTML, 
              style: attr_span.eq(1)[0].innerHTML.split(': ')[1], 
              UPC: attr_span.eq(2)[0].innerHTML.split(': ')[1], 
              size: attr_span.eq(3)[0].innerHTML.split(': ')[1], 
              color: attr_span.eq(4)[0].innerHTML.split(': ')[1], 
              price: attr_span.eq(5)[0].innerHTML
          }
          products.push(attr_obj);
      })

      // console.log('order_number = ', order_number);
      // console.log('products = ', products);
      var res_obj = {
        order_number: order_number,
        products: products
      }
      
      res.send(res_obj);
  }); // jsdom.env

  
  
} // parser

exports.parser = parser;