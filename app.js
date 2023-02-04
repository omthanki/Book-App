require("dotenv").config()
require("./db/conn")

const express = require('express')
const hbs = require("hbs")
const path = require("path")
const app = express()

app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname,"./partials"))

const router = require("./routes/route")
app.use(router)

app.listen(process.env.PORT, () => {
    console.log("Server is listening at " + process.env.PORT);
})