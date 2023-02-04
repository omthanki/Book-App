const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
        
        const token = req.cookies.jwtcookie;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)

        next()

    } catch (error) {
        res.render("login")
    }

}

module.exports = auth