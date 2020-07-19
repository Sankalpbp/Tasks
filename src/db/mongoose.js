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

// creating the task model
const Task = mongoose.model('Task', {
    description: {
        type: String
    }, 
    completed: {
        type: Boolean
    }
});

const workout = new Task({
    description: 'Do some exercise.',
    completed: true
});

workout.save().then(() => {
    console.log(workout);
}).catch(() => {
    console.log('Error: ', error);
});