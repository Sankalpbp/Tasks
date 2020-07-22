'use strict'

require('../src/db/mongoose.js');
const User = require('../src/models/user.js');

User.findByIdAndUpdate('5f16973c12c9eb50b613a68b', { age: 1 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 1 });
}).then((count) => {
    console.log(count);
}).catch((error) => {
    console.log(error);
});