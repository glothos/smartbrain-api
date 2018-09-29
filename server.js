const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const Clarifai = require('clarifai');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true
  }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());



//get will responde to access requests (get gets the html, js, css files)
app.get('/', (req, res) => {
  res.send('it is working!');
})

app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db)});

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen (process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})

/*  ENDPOINTS
  res = this is working (get request for accessing)
/signin ---> POST = success/fail (this is post due to safety of informations. Password will go in post request body)
/register --> POST = new user
/profile/:userId --> GET = user (page and user informations)
/image --> PUT = user (this is to update user's rank)
*/