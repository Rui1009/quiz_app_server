const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient
const _ = require("lodash")

router.post("/", (req, res) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("dummyAnswerHistory", (error, collection) => {
            collection.insertMany(_.range(10).map((num) => (
                {
                    question: req.body[num].question,
                    username: req.body[num].username,
                    result: req.body[num].result,
                    field: req.body[num].field,
                    level: req.body[num].level
                }
                )))
        })
    })
})


module.exports = router