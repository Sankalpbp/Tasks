'use strict'

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    }
});

module.exports = Task;