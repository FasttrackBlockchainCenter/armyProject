//Handles the sessions
const express = require('express');
const session = require('express-session')
const morgan = require('morgan');
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')
const fileUpload = require('express-fileupload')


//connection to the database
const pool = require('./database')

//helpers for hash and other stuff
const helpers = require('./lib/helpers.js')

const app = express();

//Sets view engine
app.set('view engine', 'ejs');

//session
// app.use(session({
//     secret: 'uwuxdthisissecure',
//     resave: false,
//     saveUninitialized: false
// }))

//middleware
// app.use(express.static('public'))
// app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(fileUpload())


const port = process.env.PORT || 3000;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    // delete options

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api', apiRouter);

app.listen(port, ()=>{
    console.log('Server running on port ' + port)
})



// http://localhost:3000/api/login/verify?email=rafayelkhachatryan299@gmail.com&token=CG6p9iBLJAh7IQMIfS2O3TnSDCISmAN63dK0f3a9