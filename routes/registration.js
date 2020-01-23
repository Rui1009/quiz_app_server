const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient

router.post("/", (req, res) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("personal", (error, collection) => {
            collection.insertOne({username: req.body.username, password: req.body.password})
        })
    })
})

module.exports = router