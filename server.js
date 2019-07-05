const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
/*const road = require('./routes/routes');*/


//INIT EXPRESS
const app = express();
const PORT = 3000;


//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(helmet());


//ROUTE
/*app.use('/v1', road);*/



//SERVER
app.listen(PORT, () => console.log(`Express server is up and running on port ${PORT}`));