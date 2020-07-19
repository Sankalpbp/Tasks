'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// creating the model
const User = mongoose.model('User', {
    name: {
        type: String
    }, 
    age: {
        type: Number
    }
});

// creating an instance of the model
const me = new User({
    name: 'Sankalp',
    age: 21
});

// saving the object so created into database, and here Mongoose will map the object to a document
me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
});
