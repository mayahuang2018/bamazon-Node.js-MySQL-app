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
    console.log("Hello, you're the NO."+connection.threadId+" guest of Bamazon!");
    displayProducts();
});

// Running this application will first display all of the items available for sale.
//  Include the ids, names, and prices of products for sale.

function displayProducts(){
    console.log("===========================================");
    console.log("Items available for sale");
    console.log("===========================================");

    connection.query("SELECT * FROM products", function(err,data){
        if(err)
        {
            console.log(err);
        }

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
function palceOrder(){

    inquirer.prompt([{

        // The first should ask them the ID of the product they would like to buy.
        name: "id",
        type: "number",
        message: "Please enter product ID you want to buy: ",
        
    },{
        // The second message should ask how many units of the product they would like to buy.
        name:"quantity",
        type:"number",
        message: "How many units you would like to buy？",
       

    }]).then(function(answer){
        
        var theItemID = answer.id;
        var theItemQuantity = answer.quantity;

        purchaseOrder(theItemID,theItemQuantity);

});
};

//Once the customer has placed the order, 
//your application should check if your store has enough of the product to meet the customer's request.

function purchaseOrder (ID,Q){

        connection.query(
            "SELECT * FROM products where item_id = " +ID,
            function(err, res) {
              if (err){console.log(err)};

              //if your store does have enough of the product, you should fulfill the customer's order.               
              if (Q <= res[0].stock_quantity){

                  //Once the update goes through, show the customer the total cost of their purchase.
                  var totalCost = res[0].price * Q;
                  console.log("Add to Cart! Total cost: "+totalCost);

                  // updating the SQL database to reflect the remaining quantity.
                  connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [res[0].stock_quantity-Q, ID], function (err) {
                    if (err) throw err;
                  })

                  connection.end(); 

              }else{
             //If not, the app should log a phrase like Insufficient quantity!
                console.log("Sorry, "+res[0].product_name+" is out of stock! ")

                //and then(3s later) prevent the order from going through.
                setTimeout(displayProducts, 3000)
                
              }
              
             
            }
            
         );
           
        
        }