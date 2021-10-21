const config = require("./config")

const express = require("express")
const app = express()

app.use(express.static(config.STATIC_FOLDER))

app.listen(config.PORT)