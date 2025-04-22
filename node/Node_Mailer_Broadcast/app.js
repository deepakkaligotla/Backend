const express = require("express");
const cors = require('cors')
const morgan = require('morgan')
var bodyParser = require('body-parser')
const path = require('path');

const gmailMessenger = require("./gmail");
const goDaddyMessenger = require("./goDaddy");

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json({ limit: '20mb' }))
// app.use(morgan('combined'))
app.use(express.static('images'))

app.use((request, response, next)=>{
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use(express.json({ limit: "100mb" }));
app.use(gmailMessenger)
app.use(goDaddyMessenger)
app.use(express.static(path.join(__dirname, 'public')));

app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  }); 
  
module.exports = app;