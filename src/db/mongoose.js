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
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length <= 6) {
                throw new Error('The length of password must be greater than 6.');
            }

            if (value.toLowercase().includes('password')) {
                throw new Error('The password must not contain "password" keyword');
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
        required: true,
        trim: true
    }, 
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
});

const task = new Task({
    description: 'Complete this video'
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
});