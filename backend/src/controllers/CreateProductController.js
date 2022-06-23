const path = require("path")
const { readFile, writeFile } = require("fs")

module.exports = {
  create(req, res) {
    const { name, type, qtd, description, vality, localization } = req.body

    const id = new Date().getTime().toString().slice(5)

    var new_product = {
      id,
      name,
      type,
      qtd: parseInt(qtd),
      description,
      vality,
      localization,
      created_at: new Date().toLocaleString(),
      last_edit: new Date().toLocaleString()
    }

    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if (!err) {
        let database = JSON.parse(data)

        let has_this_product = []

        database.products.forEach(product => {
          if (product.type == type && product.name == name) {
            has_this_product.push(true)
          } else {
            has_this_product.push(false)
          }
        })

        if (!has_this_product.includes(true)) {
          database.products.push(new_product)
          writeFile(path.join(__dirname, '../', 'db', 'db.json'), JSON.stringify(database, null, 2), (err) => {
            if (!err) {
              res.status(201).json({
                product: new_product
              })
            } else {
              res.status(400).json({ err })
            }
          })
        } else {
          res.status(400).json({
            result: "Product already exists"
          })
        }
      } else {
        res.json(400).json({ err })
      }
    })
  }
}