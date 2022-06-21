const path = require("path");

const { readFile, writeFile } = require("fs");
const { createContext } = require("vm");

module.exports = {
  async create(req, res) {
    const { name, type, qtd, description, vality, localization } = req.body;

    const id = new Date().getTime().toString().slice(5);

    var new_product = {
      id,
      name,
      type,
      qtd,
      description,
      vality,
      localization,
      created_at: new Date().toLocaleString(),
      last_edit: new Date().toLocaleString()
    }

    readFile(path.join(__dirname, "../", "db", "db.json"), async (err, data) => {
      if (err) throw err;

      let database = JSON.parse(data);

      let has_this_product = [];

      database.products.forEach(async product => {
        if (product.type == type && product.name == name) {
          has_this_product.push(true)
        } else {
          has_this_product.push(false)
        }
      })

      if (!has_this_product.includes(true)) {
        database.products.push(new_product)
        await writeFile(path.join(__dirname, '../', 'db', 'db.json'), JSON.stringify(database, null, 2), (err) => {
          if (err) throw err;
  
          res.status(201).json({
            result: "Created",
            product: new_product
          })
        })
      } else {
        res.status(400).json({
          result: "Product already exists"
        })
      }
    })
  }
}