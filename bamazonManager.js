var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');


var config = require('./config.js');
var dbConnection = mysql.createConnection(config);


// connect to the mysql server and sql database
dbConnection.connect(function(err) {
    if (err) throw err;
    showManagerMenu();
});


//show products; then prompt to buy for user
var showManagerMenu = function() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                listProducts();
                break;

            case "View Low Inventory":
                listLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addNewProduct();
                break;
        }
    });
};


var listProducts = function() {
    var command = "select * from products";
    var query = dbConnection.query(command, function(err, result) {
        if (err) throw err;
        console.table(result);

        showManagerMenu();
    });
};


var listLowInventory = function() {
    var command = "select * from products where stock_quantity < 5";
    var query = dbConnection.query(command, function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
            console.table(result);
        } else {
            console.log('no low inventory for now!');
        }

        showManagerMenu();
    });
};


// function to handle adding inventory into table
var addInventory = function() {
    // prompt for info about the item being put up for auction
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What is ID of product you would like to add inventory to?"
    }, {
        name: "quantity",
        type: "input",
        message: "How much inventory would you like to add?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {

        //get exsisting inventory from database
        var query = "select stock_quantity from products where ?";
        var existing_quantity;

        dbConnection.query(query, { item_id: answer.id }, function(err, res) {
            existing_quantity = res[0].stock_quantity;
            
            if(!existing_quantity){
              existing_quantity = 0;
            }
            console.log(existing_quantity);

            //now update the quantity in database
            dbConnection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: parseInt(existing_quantity) + parseInt(answer.quantity)
            }, {
                item_id: answer.id
            }], function(error) {
                if (error) throw err;
                console.log("inventory added successfully!");
                showManagerMenu();
            });
        });
    });
};





// function to add new product
var addNewProduct = function() {
  // prompt for info about the item being put up for auction
  inquirer.prompt([{
    name: "product",
    type: "input",
    message: "What is the name of product you would like to add?"
  }, {
    name: "department",
    type: "input",
    message: "What department does this product belong in?"
  }, {
    name: "price",
    type: "input",
    message: "What is the price of this product?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }, {
    name: "quantity",
    type: "input",
    message: "How much would you like to stock initially?",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    dbConnection.query("INSERT INTO products SET ?", {
      product_name: answer.product,
      department_name: answer.department,
      price: answer.price,
      stock_quantity: answer.quantity
    }, function(err) {
      if (err) throw err;
      console.log("Your product was added successfully!");
      // re-prompt the user for if they want to bid or post
      showManagerMenu();
    });
  });
};