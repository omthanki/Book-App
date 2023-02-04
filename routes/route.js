const express = require("express")

const router = new express.Router
const controller = require("../controllers/controller")

router.get("/", controller.homePage)
router.get("/login", controller.getLogin)
router.get("/register", controller.getRegister)
router.post("/login", controller.postLogin)
router.post("/register", controller.postRegister)
router.get("/logout", controller.logout)
router.get("*", controller.pagenotfound)

module.exports = router