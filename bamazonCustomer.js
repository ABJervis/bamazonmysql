var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

//

connection.connect(function (err){
    if (err) throw err;
    console.log("all set")//CHECKING CONNECTION
    displayAllItems();
    start();
});

//task one is to display all items on the list, product name & price...so select form the products list

function displayAllItems(){
    connection.query("SELECT * FROM bamazon.products", function (err, results){
        if (err) throw err;

        //run through the list to grab needed information and display
        
        for (var i= 0; i < results.length; i++){
            console.log("Product ID: " + results[i].id + "\nProduct Name: "+ results[i].product_name 
            + "\nPrice: $"+ results[i].price + "\n-------");
        }
    })
}
    //prompt for answers to what is to be purchased and how many
function start(){
    inquirer
        .prompt([{
            name: "product_choice",
            type: "input",
            message: "What is the ID of the item you would like to purchase?",
            //make sure input is valid
            validate: function(value) {
                if(value > 0 && value <= 10){
                    return true;
                }
                return "Choose an ID number between 1 and 10";
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many items would you like to purchase?",
            validate: function(value) {
                if (value > 0){
                    return true;
                }
                return "Please select at least one (1) item.";
            }
        }])
        .then(function(answer){
            console.log("Purchase: "+ answer.stock_quantity + " of product ID: " + answer.product_choice);
    
            checkRequest(parseInt(answer.stock_quantity), parseInt(answer.product_choice));
        });
}
//need to check that the request can be completed, that there are as many of the particular item as is wanted
//refer to great bay activity, the bid section

function checkRequest(unit, id){

    connection.query("SELECT stock_quantity, price FROM products WHERE ?",{
        item_id: id
    }, function (err, result){
        if (result[0].stock_quantity >= unit){
            connection.query(
                "UPDATE products SET ? WHERE ?",
               [{
                    stock_quantity: result[0].stock_quantity - unit
                },
                { 
                item_id: id
                }
            ],
            function (error){
             if (error) throw error;
             console.log("Total cost of purchase is "+ unit*(result[0].price));
             start();
            });
        
        } else {
            console.log("There are not that many items in stock. Please choose a lower quantity.");
            start();
        }

    })
}
    

    


