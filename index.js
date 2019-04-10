const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Mongoose database connection
mongoose.connect('mongodb://localhost/worldinapetri', {useNewUrlParser: true});

//CORS stuff
app.use(cors());
app.use(function (req, res, next) {
    // Grant access to users
    res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// LANDING
app.get('/', (req, res) => {
    res.send("Hello from Cobra III server");
});

// SEARCH FOR ALL AMBIENTS
mongoose.model('ambients', {id: Number, name: String});
app.get('/ambients', (req, res) => {
    mongoose.model('ambients').find(function(err, ambients){
        res.send(ambients);
    })
});

// Console stuff
var port = process.env.PORT || 27019;
app.listen(port, "0.0.0.0", () => {
    console.log('Cobra III server listening on port ' + port );
});
