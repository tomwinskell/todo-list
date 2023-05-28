const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workItems = [];

app.set("view engine", "ejs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
};

app.use(express.static("public"));

app.use(bodyParser.urlencoded( {extended:true} ));

app.get("/", (req, res) => {
    
    let day = date.getDate();

    res.render("list", {listTitle: day, listItemsArray: items} );

});

app.get("/work", (req,res) => {
    res.render("list", {listTitle: "Work", listItemsArray: workItems} );
});

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    };

});

app.listen(process.env.PORT || 8000, function() {
    console.log("Server is listening on port " +port);
});

// for (let index = 0; index < items.length; index++) {
//     <li> <%=newListItem%> </li>
// }