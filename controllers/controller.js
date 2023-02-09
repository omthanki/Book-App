const {userModel, bookModel} = require("../models/model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')

module.exports.home = async (req, res) => {

    try {

        const data = await bookModel.find({})
    
        res.render("index", {data})
        
    } catch (error) {
        console.log(error)
    }
}

module.exports.Login = async(req, res) => {
    if(req.method == "GET"){
        res.render("login")
    }
    if(req.method == "POST"){
        
    try {
        
        const {email, password} = req.body

        const data = await userModel.findOne({email})

        const verifyPassword = await bcrypt.compare(password, data.password)

        if(verifyPassword){

            const token=jwt.sign({email:data.email}, process.env.SECRET_KEY)
    
            res.cookie("jwtcookie", token, {expiresIn: '24h', httpOnly: true})
            console.log("cookie verified ")
            res.render("index")
        }
        else{
            res.send("Login Failed")
        }

    } catch (error) {
        res.send("Login Failed")
    }
    }
}

module.exports.getRegister = (req, res) => {
    res.render("register")
}



module.exports.postRegister = async (req, res) => {

    try {

        const password = req.body.password
        const cpassword = req.body.cpassword

        if (password !== cpassword)
            res.send("Passwords doesn't matched")

        if ((password.length < 8) || (password.length > 16) || (cpassword.length < 8) || (cpassword.length > 16) )
            res.send("Password length must be between 8 to 16 characters")

        const hash = await bcrypt.hash(password, 10)

        if (hash){
            const data = new userModel({
                name: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            })

            const registered = await data.save()

            if(registered)
                res.redirect("/login")
        }

    } catch (error) {
        console.log("Error: " + error);
        res.send(error)
    }
}

module.exports.logout = async (req, res) => {

    await res.clearCookie("jwtcookie")
    res.redirect("/login")
}

module.exports.addBook = auth, (req, res) => {
    res.render("addbook")
}

module.exports.postAddbook = async (req, res) => {

    try {
        
        const data = new bookModel({
            name: req.body.bookname
        })

        const added = await data.save()

        if(added){
            res.render("index")
        }

    } catch (error) {
        res.send(error)
    }

}

module.exports.deleteBook = async (req, res) => {

    try {
        
        const _id = req.params.id

        console.log(_id);

        const isdeleted = await bookModel.deleteOne({_id: _id})

        console.log(isdeleted);

        if(isdeleted){
            res.send("Deleted successfully")
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports.pagenotfound = (req, res) => {
    res.render("404")
}