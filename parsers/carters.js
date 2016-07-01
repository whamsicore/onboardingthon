/////////////
// CARTERS //
/////////////

exports.parser = function($) {
  /////////////////////
  // TRACKING NUMBER //
  /////////////////////
  try{
    var tracking_number = $("span:contains(tracking number)").closest('table').closest('tr').next().find('span a').html();
  }catch(err){}

  /////////////////
  // ORDERNUMBER //
  /////////////////
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

    // console.log('=========================================');
    var attr_obj = {
      image_url: image_url, 
      title: entities.decode(attr_span.eq(0)[0].innerHTML), 
      style: attr_span.eq(1)[0].innerHTML.split(': ')[1], 
      UPC: attr_span.eq(2)[0].innerHTML.split(': ')[1], 
      size: attr_span.eq(3)[0].innerHTML.split(': ')[1], 
      color: attr_span.eq(4)[0].innerHTML.split(': ')[1], 
      price: attr_span.eq(5)[0].innerHTML
    } // attr_obj

    products.push(attr_obj);
  }); // .foreach

  // console.log('order_number = ', order_number);
  // console.log('products = ', products);
  var res_obj = {
    order_id: order_number,
    linc_care_orderitems: products
  }
  
  if(tracking_number) {
    res_obj.tracking_number = tracking_number;
  }

  return res_obj; 
}