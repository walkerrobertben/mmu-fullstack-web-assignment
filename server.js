const express = require("express")
const morgan = require('morgan')
const bodyParser = require("body-parser");


const app = express()

// Server port
const HTTP_PORT = 3333 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port: " + HTTP_PORT)
});

// Logging
app.use(morgan('tiny'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"status":"Alive"})
});

// Other API endpoints: Links go here...
require("./app/routes/articles.routes")(app);
require("./app/routes/users.routes")(app);

// Default response for any other request
app.use(function(req, res){
    res.sendStatus(404);
});