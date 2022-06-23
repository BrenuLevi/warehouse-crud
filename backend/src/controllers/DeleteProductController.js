const path = require("path")
const { readFile, writeFile } = require("fs")

module.exports = {
  delete(req, res) {
    const { id } = req.params

    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if (!err) {
        let database = JSON.parse(data)

        database.products.forEach(async product => {
          if (product.id == id) {
            database.products.splice(database.products.indexOf(product), 1)

            writeFile(path.join(__dirname, "../", "db", "db.json"), JSON.stringify(database, null, 2), err => {
              if (!err) {
                res.status(200).json({
                  product
                })
              } else {
                res.status(400).json({ err })
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