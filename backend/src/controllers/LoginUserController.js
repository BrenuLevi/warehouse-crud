const path = require("path")
const { readFile, read } = require("fs")

module.exports = {
    async store(req, res) {
        const { user, pass } = req.body

        readFile(path.join(__dirname, "../", "db", "db.json"), (err, data) => {
            if (!err) {
                const credentials = JSON.parse(data).credentials
                if (credentials.user == user && credentials.password == pass) {
                    res.status(200).json({ result: "Success" })
                } else {
                    res.status(400).json({ result: "Invalid credentials"})
                }
            } else {
                res.status(400).json(err)
            }
        })
    }
}