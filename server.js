const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const road = require('./routes/routes');
require('dotenv').config();


//INIT EXPRESS
const PORT = 5000;
const app = express();




//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());


//ROUTE
app.use('/v1', road);


//MONGOOSE CONNECTION
const dbRoute = process.env.DB_ACCOUNT;

mongoose.set('useFindAndModify', false);
mongoose.connect(dbRoute, {
    useNewUrlParser: true
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected Database MongoDB..."));

db.on("error", console.error.bind(console, "MongoDB connection error"));


//SERVER
app.listen(process.env.PORT || 5000, () => console.log(`Express server is up and running on port ${PORT}`));


