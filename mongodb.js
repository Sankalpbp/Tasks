'use strict'
// CRUD create read update and delete

const { MongoClient, ObjectID } = require('mongodb');

 
const connectionURL = 'mongodb://127.0.0.1/27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    db.collection('users').findOne({ _id: new ObjectID("5f131257eab371273bde68c4") }, (errro, user) => {
        if (error) {
            return console.log('Unable to fetch the user');
        } 

        console.log(user);
    });

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks);
    });
});