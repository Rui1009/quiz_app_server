const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient

router.get("/*", (req, res) => {
    //得意分野の取得、ポイントの計算
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("dummyAnswerHistory", (error, collection) => {
            collection.find({username: {$eq: req.query.user}, result: {$eq: "O"}}).toArray((error, docs) => {
                //ポイント計算
                let plus = 0;
                for (let doc of docs) {
                    doc.level === "easy" ? plus = plus + 3 : plus = plus + 5
                }
                //得意分野取得
                let fieldArray = [
                    {
                        field: "Geography", point: 0
                    },
                    {
                        field: "History", point: 0
                    },
                    {
                        field: "Entertainment", point: 0
                    }
                ];
                docs.map((doc) => {
                    switch (doc.field) {
                        case "Geography":
                            fieldArray[0].point++;
                        break;
                        case "History":
                            fieldArray[1].point++;
                        break;
                        case "Entertainment":
                            fieldArray[2].point++;
                        break;
                        default:
                            return null
                    }
                })
                let newArray = fieldArray.sort((a, b) => {
                    if (a.point < b.point) return 1;
                    if (a.point > b.point) return -1;
                    return 0
                })
                const strongField = newArray[0].field;
                //苦手分野の取得、ポイントの計算
                MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
                    const db = client.db(DATABASE);
                    db.collection("dummyAnswerHistory", (error, collection) => {
                        collection.find({username: {$eq: req.query.user}, result: {$eq: "X"}}).toArray((error, docs) => {
                            //ポイントの計算
                            let minus = 0;
                            for (let doc of docs) {
                                doc.level === "easy" ?  minus = minus + 2 : minus = minus + 1
                            }
                            //苦手分野の取得
                            let fieldArray = [
                                {
                                    field: "Geography", point: 0
                                },
                                {
                                    field: "History", point: 0
                                },
                                {
                                    field: "Entertainment", point: 0
                                }
                            ];
                            docs.map((doc) => {
                                switch (doc.field) {
                                    case "Geography":
                                        fieldArray[0].point++;
                                        break;
                                    case "History":
                                        fieldArray[1].point++;
                                        break;
                                    case "Entertainment":
                                        fieldArray[2].point++;
                                        break;
                                    default:
                                        return null
                                }
                            });
                            let newArray = fieldArray.sort((a, b) => {
                                if (a.point < b.point) return 1;
                                if (a.point > b.point) return -1;
                                return 0
                            })
                            const weakField = newArray[0].field;
                            MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
                                const db = client.db(DATABASE);
                                db.collection("personal", (error, collection) => {
                                    collection.find({username: {$eq: req.query.user}}).toArray((error, docs) => {
                                        const point = plus - minus;
                                        docs[0].point = point;
                                        docs[0].strongField = strongField;
                                        docs[0].weakField = weakField;
                                        res.json(docs[0])
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