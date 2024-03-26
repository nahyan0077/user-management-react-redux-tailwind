const mongoose = require('mongoose');
require('dotenv').config(); 

// Connection URI from MongoDB Atlas
const uri = process.env.mdb_atlas

// Connect to MongoDB Atlas
const connectDB = mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas', error);
    });



module.exports = connectDB
