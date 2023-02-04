const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB)
.then( () => { console.log("Database connected successfully..!") })
.catch((err) => { console.log("Error: " + err); })