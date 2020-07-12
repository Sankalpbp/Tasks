'use strict'
// CRUD create read update and delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
 
const connectionURL = 'mongodb://127.0.0.1/27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('tasks').insertMany([
        {
            description: 'Complete the 2.5 hours of Node.js',
            completed: false
        }, {
            description: 'Start working on the Final Preparation',
            completed: false
        }, {
            description: 'Complete Linked lists from Karumanchi',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents');
        } 

        console.log(result.ops);
    });
});