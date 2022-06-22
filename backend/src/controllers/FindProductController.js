const path = require("path");

const { readFile } = require("fs");

module.exports = {
  async show(req, res) {
    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if(err) throw err;

      const database = JSON.parse(data);

      res.status(200).json(database);
    })
  },

  async filtered(req, res) {
    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if(err) throw err;

      const database = JSON.parse(data);
      let result = []

      const { filter } = req.params;

      database.products.forEach(product => {
        if(String(product.type).toLowerCase() == String(filter).toLowerCase()) {
          result.push(product)
        }
      })
      
      res.status(200).json(result)
    })
  },

  async findOne(req, res) {
    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if(err) throw err;

      const database = JSON.parse(data);

      database.products.forEach(product => {
      })
    })
  }
}