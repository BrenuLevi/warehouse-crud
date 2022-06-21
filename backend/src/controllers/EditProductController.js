const path = require("path");

const { readFile, writeFile } = require("fs");

module.exports = {
  async edit(req, res) {
    const { name, type, qtd, description, vality, localization} = req.body;

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
          if(vality !== undefined) {
            product.vality = vality;
          }
          if(localization !== undefined) {
            product.localization = localization;
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