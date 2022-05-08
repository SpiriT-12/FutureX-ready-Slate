const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParse = require('body-parser');
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
   })
);
app.use(cookieParser());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(
   session({
      key: 'userId',
      secret: 'WHYcareABOUTsecretsINlocalhostNOoneISgonaSEEanyhow',
      resave: false,
      saveUninitialized: false,
      cookie: {
         expires: 60 * 60 * 24,
      },
   })
);

//Routes

//GET Routes

app.get('/login', (req, res) => {
   if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
   } else {
      res.send({ loggedIn: false });
   }
});

//END of GET Routes

//POST Route

//login
app.post('/login', async (req, res) => {
   const { email, password } = req.body;
   pool.query(
      'SELECT * FROM users WHERE email = $1 ',
      [email],
      (err, results) => {
         if (err) {
            console.log(err);
         }
         if (results.rows.length <= 0) {
            res.send({ msg: 'User not found', status: 404 });
         } else {
            const user = results.rows[0];

            bcrypt.compare(password, user.password, (error, result) => {
               if (result) {
                  req.session.user = user;
                  res.send({ msg: 'Welcome', status: 200, user: user });
               } else {
                  res.send({ msg: 'wrong password', status: 401 });
               }
            });
         }
      }
   );
});

// Register
app.post('/register', async (req, res) => {
   const { name, email, phone, password } = req.body;
   bcrypt.hash(password, 10, (err, hash) => {
      pool.query(
         'SELECT * FROM users WHERE email = $1  OR phone = $2',
         [email, phone],
         (err, results) => {
            if (err) {
               console.log(err);
            }
            if (results.rows.length > 0) {
               res.send({
                  msg: 'Email or Phone Alredy Exists',
                  status: 400,
               });
            } else {
               pool.query(
                  'INSERT INTO users (name , email, phone, password) VALUES ($1, $2, $3, $4)',
                  [name, email, phone, hash],
                  (err, results) => {
                     if (err) {
                        console.log(err);
                        console.log('went wrong in insert');
                     }
                     res.send({
                        msg: 'Successfully Registered...',
                        status: 200,
                     });
                  }
               );
            }
         }
      );
   });
});

app.post('/home', (req, res) => {});

// END of POST Routes
app.listen(5000, (req, res) => {
   console.log('server running at port 5000');
});
