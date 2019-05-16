// connect node.js and mysql
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host     : "localhost",
  port     : 3306,
  user     : "root",
  password : "docker",
  database : "bamazon_db"
});
 
connection.connect(function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("COnnected as id: "+connection.threadId);
    displayProducts();
});
 
/*connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  displayProducts();
});*/


// Running this application will first display all of the items available for sale.
//  Include the ids, names, and prices of products for sale.

function displayProducts(){
    console.log("===========================================");
    console.log("Items available for sale");
    console.log("===========================================");

    connection.query("SELECT * FROM products", function(err,data){
        var table = new Table({
            head: ["ID","Item Name","Department Name","Price","Stock Quantity"]
        });

        for(var i=0;i<data.length;i++){
            var arr = [];
            for(var key in data[i]){
                arr.push(data[i][key]);
            }
            table.push(arr);
        }
        console.log(table.toString());
        palceOrder();
    })
}


// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

function palceOrder(){
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Please enter product ID you want to buy: "
    },{
        name:"quantity",
        type:"input",
        message: "Please enter quantity:"
    }]).then(function(answer){
        console.log(answer);
    })

    connection.end();
}




