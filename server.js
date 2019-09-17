// =========================
//   DEPENDENCIES AND CONFIG
// =========================
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const https = require('https');
const app = express();
// const PORT = process.env.PORT;
console.log(process.env.MONGODB_URI);
const db = mongoose.connection;
// =========================
//                MIDDLEWARE
// =========================
app.use(express.static('public'));
app.use(express.json());
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// =========================
//                    ROUTES
// =========================
app.get('/app', (req, res)=>{
    //test if user has logged in
    if(req.session.currentUser){
        //if so, show the "main app"
        res.json(req.session.currentUser);
    } else {
        //if not, redirect to log in page
        res.status(401).json({
          status:401,
          message:'not logged in'
        });
    }
});


// =========================
//                  DATABASE
// =========================

const mongodbURI = process.env.MONGODB_URI;
mongoose.connect(mongodbURI, {useNewUrlParser: true});
db.on('connected', () => console.log('mongo connected:'));

// =========================
//               CONTROLLERS
// =========================
// const businessController = require("./controllers/business.js");
// app.use("/business", businessController);
//
// const sessionController = require("./controllers/sessions.js");
// app.use("/sessions", sessionController);

// =========================
//                  LISTENER
// =========================
app.listen(3000, ()=>{
    console.log('listening...');
});
mongoose.connect('mongodb://localhost:27017/auth', {useNewUrlParser:true});
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
});
