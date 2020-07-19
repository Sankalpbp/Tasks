'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// creating the model
const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (validator.isEmail(value) === false) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number.');
            }
        }
    }
});


// creating the task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
    }, 
    completed: {
        type: Boolean
    }
});

const me = new User({
    name: '        Sankalp                        ',
    email: 'MIKE@MEAD.IO       '
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
});