const express = require("express");
const cors = require("cors");

const api = express();
let port = 3333;

const routes = require("./routes");

api.use(cors());
api.use(express.json());
api.use(routes);

api.listen(port, () => console.log(`API running on port ${port}`));