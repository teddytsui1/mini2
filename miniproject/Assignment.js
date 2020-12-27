require('./models/db');
const express = require('express');
const app = express();
app.set('trust proxy', 1)
const bodyParser = require('body-parser')
const session = require('cookie-session');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const http = require('http');
const url = require('url');
const Mongourl = 'mongodb+srv://teddytsui:test123@cluster0.pmckb.mongodb.net/test?retryWrites=true&w=majority';  // MongoDB Atlas Connection URL
const dbName = 'test'; // Database Name
const { stringify } = require('querystring');

const mongoose = require('mongoose');
mongoose.connect('mongodb://teddytsui:test123@cluster0-shard-00-00.pmckb.mongodb.net:27017,cluster0-shard-00-01.pmckb.mongodb.net:27017,cluster0-shard-00-02.pmckb.mongodb.net:27017/test?ssl=true&replicaSet=atlas-c9r8kd-shard-0&authSource=admin&retryWrites=true&w=majority',
{useMongoClient: true,}
);
var restaurant = mongoose.model('restaurant');



app.set('view engine','ejs');

const SESSION_SECRET = 'secretkey';

const users = new Array(
	{name: 'demo', password: '' },
	{name: 'student', password: '' }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
	name: 'SESSION_NAME',
	secret: [SESSION_SECRET]
	}));

const client = new MongoClient(Mongourl);


client.connect((err) => {
	assert.equal(null,err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
});

app.get('/', (req,res) => {
	console.log(req.session);
	if (!req.session.authenticated) {    // user not logged in!
		res.redirect('/login');
	} else {
		res.redirect('/home');
	}
});
	

app.get('/home', (req,res) => {
	res.status(200).render('homepage',{name:req.session.username});
});

app.get('/login', (req,res) => {
	res.status(200).render('login',{});
});
 
app.post('/login', (req,res) => {
	users.forEach((user) => {
		if (user.name == req.body.name && user.password == req.body.password) {
			// correct user name + password
			// store the following name/value pairs in cookie session
			req.session.authenticated = true;        // 'authenticated': true
			req.session.username = req.body.name;	 // 'username': req.body.name		
			res.redirect('/home');
		}
	});
	res.redirect('/');
});

app.get('/create', (req,res) => {
    res.status(200).render('Create',{});
});

app.post('/create', (req,res) => {
	res.send('Created!');
});
/*
function SaveRecord(req,res){
	var NewRecord = new restaurant();
	NewRecord.restaurant_id=req.body.restaurant_id;
	NewRecord.name = req.body.name;
	NewRecord.borough = req.body.borough;
	NewRecord.cuisine = req.body.cuisine;
	NewRecord.photo = req.body.photo;
	NewRecord.photo_mimetype = req.body.photo_mimetype;
	NewRecord.address = {};
	NewRecord.address.street = req.body.street;
	NewRecord.address.building = req.body.building;
	NewRecord.address.zipcode = req.body.zipcode;
	NewRecord.grades = {};
	NewRecord.grades.user = req.body.user;
	NewRecord.grades.score = req.body.score;
	NewRecord.save((err, doc) => {
		if (!err)
			res.redirect('/display');
	});
};
*/

app.get('/display', (req,res) => {
    res.json('Displayed');
});

/*
app.get('/search', (req,res) => {
    search_document(res, req.query.docs);
})

app.get('/edit', (req,res) => {
    handle_Edit(res, req.query);
})

app.post('/update', (req,res) => {
    handle_Update(req, res, req.query);
})

*/

app.get('/*', (req,res) => {
    //res.status(404).send(`${req.path} - Unknown request!`);
    res.status(404).render('info', {message: `${req.path} - Unknown request!` });
});


app.listen(process.env.PORT || 8099);
