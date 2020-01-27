const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient
var tokens = new require("csrf")();

router.get("/", (req, res) => {
    const secret = req.session._csrf
    const token = req.cookies._csrf
    console.log(req)
    // if (tokens.verify(secret, token) === false) {
    //     throw new Error("Invalid Token.");
    // } else {
    //     console.log("clear")
    // }

    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("EasyQuiz", (error, collection) => {
            collection.find().toArray((error, docs) => {
                res.json(docs)
            })
        })
    })
})

module.exports = router

