var sequential = require("sequential-ids"); 
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
var expressValidator = require('express-validator');
const routes  = require('./routes');
var cors = require('cors')

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(expressValidator())
app.use(cors())
console.log(process.env.PORT);
let port = process.env.PORT;
let connectionString="mongodb://"+ process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
const mongoDB = connectionString;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
app.use(bodyParser({limit: '50mb'}));
//app.use(bodyParser.urlencoded({limit: '50MB'}));
app.use(bodyParser.json());
app.use('/', routes);
db.on('error',function(){
    console.log(connectionString);
    console.log("Error connecting to DB");
});

db.once('open',function(){

    console.log("DB connected",connectionString);
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}/`);
      });
});