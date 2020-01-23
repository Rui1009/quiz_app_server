const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient


router.get("/", (req, res) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("dummyEasyQuiz", (error, collection) => {
            collection.find().toArray((error, docs) => {
                res.json(docs)
            })
        })
    })
})

module.exports = router