const config = require("./config")

const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.static(config.STATIC_FOLDER))

app.listen(config.PORT)