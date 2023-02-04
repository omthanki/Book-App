const User = require("../models/model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const auth = require('../auth/auth')

module.exports.homePage = auth, (req, res) => {
    res.render("index")
}

module.exports.getLogin = (req, res) => {
    res.render("login")
}

module.exports.getRegister = (req, res) => {
    res.render("register")
}

module.exports.postLogin = async (req, res) => {

    try {
        
        const {email, password} = req.body

        const data = await User.findOne({email})

        const verifyPassword = bcrypt.compare(password, data.password)

        const token=jwt.sign({email:data.email}, process.env.SECRET_KEY)

        res.cookie("jwtcookie", token, {expiresIn: '24h', httpOnly: true})

        if(verifyPassword){
            res.render("index")
        }

    } catch (error) {
        console.log(error)
    }

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
            const data = new User({
                name: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            })

            const registered = await data.save()

            if(registered)
                res.render("login")
        }

    } catch (error) {
        console.log("Error: " + error);
        res.send(error)
    }
}

module.exports.logout = (req, res) => {

    res.clearCookie("jwtcookie")
    res.render("login")
}

module.exports.pagenotfound = (req, res) => {
    res.render("404")
}