const path = require("path")
const { readFile, writeFile } = require("fs")

module.exports = {
  edit(req, res) {
    const { name, type, qtd, description, vality, localization } = req.body

    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if (!err) {
        let database = JSON.parse(data);

        database.products.forEach(async product => {
          if (product.id == req.params.id) {
            if (name != "") {
              product.name = name
            }
            if (type != "") {
              product.type = type
            }
            if (qtd != "") {
              product.qtd = parseInt(qtd)
            }
            if (description != "") {
              product.description = description
            }
            if (vality != "") {
              product.vality = vality;
            }
            if (localization != "/") {
              product.localization = localization
            }

            product.last_edit = new Date().toLocaleString();

            writeFile(path.join(__dirname, "../", "db", "db.json"), JSON.stringify(database, null, 2), err => {
              if (!err) {
                res.status(200).json({
                  product
                })
              } else {
                res.status(400).json({
                  err
                })
              }
            })
          }
        })
      } else {
        res.status(400).json({ err })
      }
    })
  }
}