const mysql = require("mysql");
const inquirer = require("inquirer");

require("console.table");

// connect database
const db = mysql.createConnection({
  host: "localhost", 
  port: 3306, 
  user: "root", 
  password: "", 
  database: "bamazon"});

  //connection to database
  db.connect((err) => {
    if (err) throw err;
    console.log("you're now connected to the database");

    productLoad();

  });

  //load products to console

  function productLoad() {
    db.query("SELECT * FROM products", function(err, res){
      if (err) throw err;
      console.table(res);
      promptCustomer(res);

    });

  }
  
//ask customer what product they want
  function promptCustomer(inventory) {
    inquirer.prompt([
      {
        name: "itemChoice",
        type: "input",
        message: "What is the ID of the product you would like?"
      }
    ]).then(function(val) {
      checkIfShouldExit(val.itemChoice);

      var choiceID = parseInt(val.itemChoice)

      var product = checkInventory(choiceID, inventory);

      if (product) {
        itemQuantity(product);
      }

      else {
        console.log("that item is not in the inventory");
      }

    })

  }

  //asks how many units of product clt wants to buy

  function itemQuantity(product) {
    inquirer.prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many do you want to buy? [Quit with Q]",
       validate: function(val) {
         return !isNaN(val) || val.toLowerCase() === "q";
       }
      }
    ]).then(function(val) {
      checkIfShouldExit(val.quantity);

      var quantity = parseInt(val.quantity)

      if(quantity > product.stock_quantity) {
        console.log("not enough inventory to process your request");
        productLoad();
      }

      else {
        purchaseProduct(product, quantity);
      }
    })
  }

  //function to complete user's purchase
  function purchaseProduct(product, quantity) {
    db.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ? ", [quantity, product.item_id], 

    function (err, res) {
      console.log("congrats, you purchased this many - " + quantity + " - " + product.product_name + " (s)")

      productLoad();
    }  
  )
  }

  // function that checks inventory of product
  function checkInventory(choiceID, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === choiceID) {
        return inventory[i];
      }     
    }

    return null;
  }  
  
// exit function
  function checkIfShouldExit(choice) {
    if (choice.toLowerCase() === "q") {
      // Log a message and exit the current node process
      console.log("Goodbye!");
      process.exit(0);
    }
   }