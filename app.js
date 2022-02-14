const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());

const bodyParser = require('body-parser');
const axios = require('axios');
const blockRoute = require('./routes/block.route');



//// mongo 

const mongoose = require('mongoose');
const mongo_url = 'mongodb://localhost:27017/solana';
const mongoDb = process.env.MONGODB_URI || mongo_url;
mongodb://mongodb_user:password@localhost:27017/mongodb_db
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
//var mongo_url = "mongodb://akbarba1_ticket:mamad2017@akbar-baba.ir:27017/akbarba1_ticket"

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

////

app.use(express.static('views'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/solana', blockRoute);


//////




app.listen(8070, 'localhost', (req, res) => {

    console.log('server is running on port 8080')


})

exports.server = app;
