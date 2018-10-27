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

    runSearch();
  });


  // asks user what search they would like to do

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add new product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        viewInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add new product":
        addProduct();
        break;
      }
    });
}

// fuction so user can see

function viewProducts(){
  console.log('All available items:');

  // select all products enteres in database
  db.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  console.table(res);

  // for(var i = 0; i< res.length; i++){

  //   // console.log(
  //   //   "ID: " + res[i].item_id + " | " + 
  //   //   "Product: " + res[i].product_name + " | " + 
  //   //   "Department: " + res[i].department_name + " | " + 
  //   //   "Price: " + res[i].price + " | " + 
  //   //   "QUANTITY: " + res[i].stock_quantity);
  // }

   // allow user to start a new search
  runSearch();
  });
}

// displays products with inventory lower than 5
function viewInventory(){
  console.log('Low inventory items:');

  db.query('SELECT * FROM products', function(err, res){
  if(err) throw err;

  for(var i = 0; i<res.length;i++){
    if(res[i].stock_quantity <= 5){
    console.log(
      "ID: " + res[i].item_id + " | " + 
      "Product: " + res[i].product_name + " | " + 
      "Department: " + res[i].department_name + " | " + 
      "Price: " + res[i].price + " | " + 
      "QUANTITY: " + res[i].stock_quantity);
  
    }
  }

  runSearch();
  });
}

// // allows user to add inventory
// function addInventory() {
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "productName",
//       message:"write product here"
//     },
//     {
//       type: "input",
//       name: "deptName",
//       message:"write department it belongs to"
//     },
//     {
//       type: "input",
//       name: "productPrice",
//       message:"write price"
//     },
//     {
//       type: "input",
//       name: "productQuantity",
//       message:"write quantity youre adding"
//     }
//   ]).then(function(ans){
//     var post = {
//       product_name: ans.productName,
//       price: ans.productPrice,
//       department_name: ans.deptName,
//       stock_quantity: ans.productQuantity
//     };

//   var query = db.query(
//     "INSERT INTO products SET ?", post, 
//     {
//       product_name: "",
//       price: 3.00,
//       stock_quantity: 50
//     }
//   ,
//     function(err, res) {
//       if(err){throw err;}
//       console.log(res);

//       runSearch();

//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }




// //allows manager to add a completely new product to store
// function addProduct(){
//   console.log('Adding New Product! ..... ');
//   var deptNames = [];

//   //grab name of departments
//   db.query('SELECT * FROM department_name', function(err, res){
//     if(err) throw err;
//     for(var i = 0; i < res.length; i++){
//       deptNames.push(res[i].department_name);
//     }
//   })

//   inquirer.prompt([{
//     type: "input",
//     name: "product",
//     message: "Product: ",
//     validate: function(value){
//       if(value){return true;}
//       else{return false;}
//     }
//   }, {
//     type: "list",
//     name: "department",
//     message: "Department: ",
//     choices: deptNames
//   }, {
//     type: "input",
//     name: "price",
//     message: "Price: ",
//     validate: function(value){
//       if(isNaN(value) === false){return true;}
//       else{return false;}
//     }
//   }, {
//     type: "input",
//     name: "quantity",
//     message: "Quantity: ",
//     validate: function(value){
//       if(isNaN(value) == false){return true;}
//       else{return false;}
//     }
//   }]).then(function(ans){
//     db.query('INSERT INTO products SET ?',{
//       ProductName: ans.product,
//       DepartmentName: ans.department_name,
//       Price: ans.price,
//       StockQuantity: ans.stock_quantity
//     }, function(err, res){
//       if(err) throw err;
//       console.log('Success! Your item has been added.');
//     })
//     start();
//   });
// }