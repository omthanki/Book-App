const express = require("express")

const router = new express.Router()
const controller = require("../controllers/controller")

router.get("/", controller.home)
router.get("/login", controller.Login)
router.post("/login", controller.Login)
router.get("/register", controller.getRegister)
router.post("/register", controller.postRegister)
router.get("/logout", controller.logout)
router.get("/addbook", controller.addBook)
router.post("/addbook", controller.postAddbook)
router.delete("/delete/:id", controller.deleteBook)
router.get("*", controller.pagenotfound)

module.exports = router