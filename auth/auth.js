const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    try {
        console.log(req.cookies.jwtcookie)
        const token = req.cookies.jwtcookie;

        if (token){

            const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
            console.log(verifyUser)
            if(!verifyUser){
                res.redirect("login")             
            }
    
        }
        else{
            res.redirect("login")
        }

        
    } catch (error) {
        console.log(error)
        res.redirect("login")
    }

}

module.exports = auth