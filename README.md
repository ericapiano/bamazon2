# bamazon
In this activity I used node.js and mySQL to create a store front from the command line that resembles Amazon.

## Getting Started
* Clone repo
* Run `npm install` to install the required dependencies.

## Instructions
* In the bamazonCustomer.js file the user is shown the list of availabiliity inventory. They are prompted to enter the ID of the product they would like to purchase.  They are them prompted to enter how many units of the product they would like to buy. If there is enough inventory, the user is advised the purchase is complete. If the user enters a quantity that exceeds the amount in inventory, they will be advised their purchase could not be completed.

* In the bamazonManager.js file the user is asked if they would like to "View Products for Sale," "View Low Inventory," "Add to Inventory," "Add new product." If the user selects "View Products for Sale" a table of all available products will display. If they select "View Low Inventory" a table of products witl 5 of less units in stock will be displays. If they user selects "Add the inventory" the user can add to the stock quantity of an existing product. If they user selects "Add new product" the user can add a new product by department name to the list of available products for sale.

* Use "ctrl + c" to exit each mode

## Demo Link
https://docs.google.com/document/d/1XSr_PkC-84hvy1diHgAASANuWWFCHBoIjiv5q1ZxEgY/edit?usp=sharing

## Technologies Used
* Node.js
* Inquire NPM Package
* MYSQL NPM Package

## Built With
* Sequel Pro
* Terminal
* Visual Studio Code