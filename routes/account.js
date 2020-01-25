const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const {authenticate, authorize} = require("../lib/security/accountcontrol")
const MongoClient = require("mongodb").MongoClient


router.post("/", authenticate(), (req, res) => {
    res.status(200).json({
        isAuthorized: true
    });
})

router.get("/logout", (req, res) => {
    req.logout();
})


module.exports = router;