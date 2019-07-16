
// PostgreSQL
// var pgp = require('pg-promise')();
// var db = pgp('postgres://postgres@localhost/cinemabooking')
// var db = pgp(process.env.DATABASE_URL)


// MongoDB
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const dbname = 'cinema_booking';
const url = 'mongodb://localhost:27017';
const mongoOptions = {useNewUrlParser: true};

const state = {
    db: null
};

const connect = (cb) => {
    if (state.db) {
        cb();
    } else {
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) {
                cb(err);
            } else {
                state.db = client.db(dbname);
                cb();
            }
        });

    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = async () => {
    return state.db;
}

module.exports = {
    // db,
    getDB,
    connect,
    getPrimaryKey,
};

// module.exports = db;
