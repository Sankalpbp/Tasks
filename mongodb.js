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

    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5f0b1b612d0d87741fd2663c")
    }, {
        $set: {
            name: 'Mike'
        }
    });

    updatePromise.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});