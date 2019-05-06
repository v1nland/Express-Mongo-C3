const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cred = require('./credentials');

const app = express();

// Mongoose database connection
mongoose.connect('mongodb://'+cred.db.user+':'+cred.db.pass+'@'+cred.db.host+'/'+cred.db.name, {useNewUrlParser: true});

// Model register
mongoose.model('ambients', {id: Number, nombre: String, viscosidad: Number, temperatura: Number, nutrientes: Number});
mongoose.model('items', {id: Number, nombre: String, descripcion : String, cantidad : Number});

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

// ADD NEW AMBIENT
app.get('/ambients/add', (req, res) => {
    const { id, no, t, v, n } = req.query;

    mongoose.model('ambients').create({ "id":id, "nombre":no, "temperatura":t, "viscosidad":v, "nutrientes":n}, function(err, resp){
        if (err)
            return res.send(err)
        else
            return res.send("Data inserted!")
    })
});

// RESET AMBIENTS
app.get('/ambients/reset', (req, res) => {

    mongoose.model('ambients').remove({}.exec(), function(err,resp){
        if (err)
            return res.send(err)
        else
            return res.send("Data removed!")
    })
});



// GET ALL ITEMS
app.get('/items', (req, res) => {
    mongoose.model('items').find(function(err, items){
        if (err)
            return res.send(err)
        else
            return res.json(items)
    })
});


// SEARCH ITEM BY ID
app.get('/items/search', (req, res) => {
    const { id } = req.query;

    mongoose.model('items').find({ "id":id }, function(err, items){
        if (err)
            return res.send(err)
        else
            return res.json(items[0])
    })
});


// ADD NEW ITEM
app.get('/items/add', (req, res) => {
    const { id, no, d, c } = req.query;

    mongoose.model('items').create({ "id":id, "nombre":no, "descripcion":d, "cantidad":c }, function(err, resp){
        if (err)
            return res.send(err)
        else
            return res.send("Data inserted!")
    })
});



// Console stuff
var port = process.env.PORT || 27019;
app.listen(port, "0.0.0.0", () => {
    console.log('Cobra III server listening on port ' + port );
});
