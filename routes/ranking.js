const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient

router.get("/", (req, res) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("personal", (error, collection) => {
            collection.find().toArray((error, docs) => {
                let responseArray = []
                docs.map((doc) => {
                    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
                        const db = client.db(DATABASE);
                        db.collection("dummyAnswerHistory", (error, collection) => {
                            collection.find({username: {$eq: doc.username}, result: {$eq: "O"}}).toArray((error, elems) => {
                                let plus = 0;
                                for (let elem of elems) {
                                    elem.level === "easy" ? plus = plus + 3 : plus = plus + 5
                                }

                                MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
                                    const db = client.db(DATABASE);
                                    db.collection("dummyAnswerHistory", (error, collection) => {
                                        collection.find({username: {$eq: doc.username}, result: {$eq: "X"}}).toArray((error, elems) => {
                                            let minus = 0;
                                            for (let elem of elems) {
                                                elem.level === "easy" ?  minus = minus + 2 : minus = minus + 1
                                            }
                                            const point = plus - minus;
                                            responseArray.push({username: doc.username, point: point})
                                            console.log(responseArray)
                                            //ポイントの高い順にソート
                                            let newArray = responseArray.sort((a, b) => {
                                                if (a.point < b.point) return 1;
                                                if (a.point > b.point) return -1;
                                                return 0
                                            })
                                            responseArray.length === docs.length ?
                                                res.json(newArray) : null
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router