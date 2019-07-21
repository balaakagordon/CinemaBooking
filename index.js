const express = require('express');
const path = require('path');
const app = express();

// const db = require('./db');
const db = require('./database');

const routes = require('./routes/api');

require('./config/passport');

const router = express.Router();

db();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

const logger = require('./middleware/logger');

const PORT = process.env.PORT || 5000;

// Init middleware
// app.use(logger);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/bookings', require('./routes/api/bookings'));
app.use('/api', router);

routes(router)

app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`)
});

// db connection
// db.connect((err) => {
//     if (err) {
//             console.log('unable to connect to DB ', err);
//         process.exit(1);
//     } else {
//         app.listen(PORT, () => {
//             console.log(`Connected to DB; Server started on port ${PORT}`)
//         });
//     }
// })
