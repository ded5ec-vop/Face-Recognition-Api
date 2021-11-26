const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '0103',
    database : 'face_rec'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

/*const database = {
	users: [
	{
		id: '123',
		name: 'John',
		email: 'john.t@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()

	},

	{
		id: '124',
		name: 'Barry',
		email: 'barry.k@gmail.com',
		password: 'apples',
		entries: 0,
		joined: new Date()

	}
	],

	login: [
	{
		id: '987',
		hash:'',
		email: 'john.t@gmail.com'
	}
	]
}*/

app.get('/', (req,res) => {
	res.send("It is working");

})

//SIGN IN \\alternative way to declare the below function
//-------------------------------------------------------->
app.post('/signin', signin.handleSignin(db, bcrypt))

//REGISTER
//---------------------------------------------------------> dependancy injection
app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

//Search by PROFILE USERID
//----------------------------------------------------------->

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })

//Increment the number of entries
//------------------------------------------------------------->

app.put('/image', (req,res) => { image.handleImageGet(req, res, db) })

//-------------------------------------------------------------->

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })




//PORT number declaration
//------------------------------------------------------------->
app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
})
