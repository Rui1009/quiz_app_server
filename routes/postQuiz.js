const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient


router.post("/", (req, res) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("personal", (error, collection) => {
            collection.updateOne(
                {username: {$eq: req.body.username}},
                {$inc: {bonusPoint: req.body.level === "入門問題" ? 30 : 20}},
                (error, result) => {
                    console.log(error)
                }

            )
        })
        MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
            const db = client.db(DATABASE);
            req.body.level === "入門問題" ?
                db.collection("EasyQuiz", (error, collection) => {
                    collection.insertOne(
                        {
                            question: req.body.question,
                            option: [req.body.option1, req.body.option2, req.body.option3, req.body.option4],
                            answer: req.body.answer,
                            description: req.body.description,
                            field: req.body.field
                        }
                    )
                })
                : db.collection("IntermediateQuiz", (error, collection) => {
                    collection.insertOne(
                        {
                            question: req.body.question,
                            answer: req.body.answer,
                            description: req.body.description,
                            field: req.body.field
                        }
                    )
                })
        })
    })
})

module.exports = router