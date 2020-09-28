const mongoose = require('mongoose');

class ConnectDB {
    constructor(URL = 'mongodb://localhost', PORT = 27017, DATABASE = 'test', option = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }) {
        this.URL = URL;
        this.PORT = PORT;
        this.DATABASE = DATABASE;
        this.OPTION = option;

        this.ADDRESS = `${URL}:${PORT}/${DATABASE}`;
    }

    async connect(useCreateIndex = true) {
        if (typeof(useCreateIndex) === 'boolean') {
            mongoose.set('useCreateIndex', useCreateIndex);
        }
        await mongoose.connect(this.ADDRESS, this.OPTION);
        console.log('DATABASE: connected.');
    }

    async disconnect() {
        await mongoose.disconnect();
        console.log('DATABASE: disconnected.');
    }
}

module.exports = ConnectDB;