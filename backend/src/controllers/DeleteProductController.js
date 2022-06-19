const path = require("path");

const { readFile, writeFile } = require("fs");

module.exports = {
  async delete(req, res) {
    const { id } = req.params;

    await readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if (err) throw err;

      let database = JSON.parse(data);

      database.products.forEach(async product => {
        if(product.id == id) {
          database.products.splice(database.products.indexOf(product), 1)

          await writeFile(path.join(__dirname, "../", "db", "db.json"), JSON.stringify(database, null, 2), err => {
            if(err) throw err;

            res.status(200).json({
              result: "Deleted",
              product
            })
          })
        }
      })
    })
  }
}