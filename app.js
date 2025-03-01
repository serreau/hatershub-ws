const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();
app.use(bodyParser.json());

var db = null
MongoClient.connect('mongodb+srv://symptom00:VN1RNRYWPu23Jx7R@cluster0.vfufp.mongodb.net/hatershub-db?retryWrites=true&w=majority', function(err,database) {
	if (err) {
    	console.error('An error occurred connecting to MongoDB: ', err);
    }
    db = database.db('hatersclub-db');
});

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Bienvenue sur HATERSCLUB');
});

app.get('/comment/get/:numberplate', (req, res) => {
	var numberplate = req.params.numberplate;
    db.collection('comment').find({ numberplate : numberplate }).toArray(function(err, results) {
		res.send(results);
	});
});

app.post('/comment/insert', (req, res) => {
	req.body.date = new Date().toISOString()
	db.collection('comment').insertOne(req.body);
	res.send({"success" : true});
});


app.listen(process.env.PORT || 3000);

