const path = require("path");

const { readFile, writeFile, write } = require("fs");

module.exports = {
  async edit(req, res) {
    const { name, type, qtd, description} = req.body;

    await readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
      if (err) throw err;

      let database = JSON.parse(data);

      database.products.forEach(async product => {
        if(product.id == req.params.id) {
          if(name !== undefined) {
            product.name = name;
          }
          if(type !== undefined) {
            product.type = type;
          }
          if(qtd !== undefined) {
            product.qtd = qtd;
          }
          if(description !== undefined) {
            product.description = description;
          }

          product.last_edit = new Date().toLocaleString();

          await writeFile(path.join(__dirname, "../", "db", "db.json"), JSON.stringify(database, null, 2), err => {
            if (err) throw err;
    
            res.status(200).json({
              result: "Updated",
              product
            })
          })
        }
      })
    })
  }
}