var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');


var config = require('./config.js');
var dbConnection = mysql.createConnection(config);


// connect to the mysql server and sql database
dbConnection.connect(function(err) {
  if (err) throw err;
  showProducts();
});	


//show products; then prompt to buy for user
var showProducts = function() {
	var command = "select * from products"
	var products;
	var query = dbConnection.query(command, function(err, result) {
	  	   if (err) throw err;
	  	   products = result;
		  console.table(products);

      //pass in the products result set to not make additional call back to database
      promptToBuy(products);
	});	
};


var promptToBuy = function(products) {
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: "what is the product ID you would like to buy?"
   },
   {
    name: "units",
    type: "input",
    message: "how many units would you like to buy?"
  }]).then(function(answer) {

    //this is where it helps to have the products passed from the previous showProducts function
    if(products[answer.id-1].stock_quantity < answer.units){
      console.log('Insufficient quantity!');
      promptToBuy(products);
    }else{
      //probably could be cleaner here by putting them in variables, but whatever did it here to avoid additonal lines of code
      //send in all the calculations here.  removing unnecessary database calls
      placeOrder(answer.id, products[answer.id-1].stock_quantity-answer.units, products[answer.id-1].price*answer.units);
    }


  }); 

};


var placeOrder = function(id, units, price){
  dbConnection.query("UPDATE products SET ? WHERE ?", [{
    stock_quantity: units
  }, {
    item_id: id
  }], function(error) {
    if (error) throw err;
    console.log("purchase successful.  total price is : $" + price);
    showProducts();
  });

}


