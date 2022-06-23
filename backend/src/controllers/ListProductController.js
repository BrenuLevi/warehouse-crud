const path = require("path")
const { readFile } = require("fs")

module.exports = {
  show(req, res) {
    readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {

      const database = JSON.parse(data)

      if(!err) {
        res.status(200).json(database)
      } else {
        res.status(400).json({
          err
        })
      }
    })
  }
}