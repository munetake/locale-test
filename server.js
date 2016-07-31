const express = require("express");

const port = process.env.PORT || 3000;

const app = express();
const routes = require('./server/routes/index');

app.use('/', routes);
app.use(express.static(__dirname + "/public"));

app.listen(port);

console.log("listening on " + port);
