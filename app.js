require("dotenv").config()
require("./db/conn")
var cookies = require("cookie-parser");

const { urlencoded } = require("express")
const express = require('express')
const hbs = require("hbs")
const path = require("path")
const app = express()
app.use(cookies());


app.use(express.json())
app.use(urlencoded({extended:false}))

app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname,"./partials"))

const router = require("./routes/route");
app.use(router)

app.listen(process.env.PORT, () => {
    console.log("Server is listening at " + process.env.PORT);
})