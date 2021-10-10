const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb+srv://qwerty:7992245309@cluster0.x21b2.mongodb.net/contio?retryWrites=true&w=majority');
}

module.exports = connect;