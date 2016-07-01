///////////
// CROCS //
///////////

// note: for decoding html entities
var entities = new require('html-entities').AllHtmlEntities();

exports.parser = function($) {
  /////////////////
  // ORDERNUMBER //
  /////////////////
  try{
      var order_number = $('body').text().match(/order number is: ([^\.\s]+)/)[1] ||
          $('body').text().match(/order #: ([^\.\s]+)/)[1];
  }catch(err){}

  try{
      var order_date = $('body').text().replace(/(?:\r\n|\r|\n)/g, ' ').match(/date ordered:\s+([^\s]+)/)[1];
  }catch(err){}

  /////////////
  // PRODUCT //
  /////////////
  var products = [];
  var rows = $('img[width=151]'); 

  rows.get().forEach(function(item){
    var image_url = $(item).eq(0).attr('src');
    var attr_arr = $(item).closest('table').next().text().split('\n');
    
    var attr_obj = {
        image_url: image_url, 
        title: attr_arr[2], 
        size: attr_arr[20], 
        color: attr_arr[15], 
        quantity: $(item).parents('table').eq(2).find('td.em_col2').html(),
        price: $(item).parents('table').eq(2).find('td.em_col3').html().split('\n')[3]
    }
    products.push(attr_obj);
  }) // loop

  // console.log('order_number = ', order_number);
  // console.log('products = ', products);
  var res_obj = {
    order_id: order_number,
    order_date: order_date,
    linc_care_orderitems: products
  }
  
  return res_obj; 
} // crocs