const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Mongoose database connection
mongoose.connect('mongodb://localhost/worldinapetri', {useNewUrlParser: true});

// Model register
mongoose.model('ambients', {id: Number, name: String, viscosidad: Number, temperatura: Number, nutrientes: Number});

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

// GET ALL AMBIENTS
app.get('/ambients', (req, res) => {
    mongoose.model('ambients').find(function(err, ambients){
        if (err)
            return res.send(err)
        else
            return res.json(ambients)
    })
});

// SEARCH AMBIENT BY ID
app.get('/ambients/search', (req, res) => {
    const { id } = req.query;

    mongoose.model('ambients').find({ "id":id }, function(err, ambients){
        if (err)
            return res.send(err)
        else
            return res.json(ambients[0])
    })
});

// SEARCH LATEST AMBIENT
app.get('/ambients/latest', (req, res) => {
    mongoose.model('ambients').find(function(err, ambients){
        if (err)
            return res.send(err)
        else
            return res.json(ambients[0])
    }).limit(1).sort({$natural:-1})
});

// Console stuff
var port = process.env.PORT || 27019;
app.listen(port, "0.0.0.0", () => {
    console.log('Cobra III server listening on port ' + port );
});
