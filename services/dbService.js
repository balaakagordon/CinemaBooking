const db = require("../db");

class sqlDB {
  getAllFields(table) {
    db.any(`SELECT * FROM ${table}`)
      .then(data => {
        return {
          status: "success",
          data: data
        };
      })
      .catch(err => {
        return {
          status: "failure",
          data: err
        };
      });
  }

  getOneField(table, criteria, value) {
    return db.one(`SELECT * FROM ${table} WHERE ${criteria} IS ${value}`);
  }
}

class noSqlDB {
  getAllFields(collection) {
    // return new Promise
    return new Promise((resolve, reject) => {
      db.getDB()
        .collection(collection)
        .find({})
        .toArray((err, data) => {
          if (err) {
            reject(err);
            // return {
            //     status: 'failure',
            //     data: err
            // }
          } else {
            resolve(data);
            console.log(" ====== ngaiii =====", data);
            // return {
            //     status: 'success',
            //     data: data
            // }
            // return data;
          }
        });
    });
  }
}

module.exports = { sqlDB, noSqlDB };
