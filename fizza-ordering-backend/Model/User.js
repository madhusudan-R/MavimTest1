const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
},
{ timestamps: true}
);

module.exports = mongoose.model('User',userSchema);

module.exports = mongoose.model('User', userSchema);

