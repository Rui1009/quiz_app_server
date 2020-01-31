const {CONNECTION_URL, DATABASE, OPTIONS} = require("../config/mongodb.config")
const router = require("express").Router()
const MongoClient = require("mongodb").MongoClient
const tokens = new require("csrf")()

router.get("/", (req, res) => {
    tokens.secret((error, secret) => {
        let token = tokens.create(secret);
        req.session._csrf = secret;
        res.cookie("_csrf", token, {secure: false, httpOnly: false})
        console.log(req);

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
                            field: "原価管理の基礎的分類", point: 0
                        },
                        {
                            field: "見積原価計算", point: 0
                        },
                        {
                            field: "実際単純個別原価計算", point: 0
                        },
                        {
                            field: "商的工業会計", point: 0
                        },
                        {
                            field: "実際部門別個別原価計算", point: 0
                        },
                        {
                            field: "実際総合原価計算", point: 0
                        },
                        {
                            field: "標準原価計算", point: 0
                        },
                        {
                            field: "原価分析", point: 0
                        },
                        {
                            field: "直接原価計算", point: 0
                        },
                        {
                            field: "企業予算", point: 0
                        },
                        {
                            field: "資本予算", point: 0
                        }
                    ];
                    docs.map((doc) => {
                        switch (doc.field) {
                            case "原価管理の基礎的分類":
                                fieldArray[0].point = fieldArray[0].point + 3;
                                break;
                            case "見積原価計算":
                                fieldArray[1].point = fieldArray[1].point + 3;
                                break;
                            case "実際単純個別原価計算":
                                fieldArray[2].point = fieldArray[2].point + 3;
                                break;
                            case "商的工業会計":
                                fieldArray[3].point = fieldArray[3].point + 3;
                                break;
                            case "実際部門別個別原価計算":
                                fieldArray[4].point = fieldArray[4].point + 3;
                                break;
                            case "実際総合原価計算":
                                fieldArray[5].point = fieldArray[5].point + 3;
                                break;
                            case "標準原価計算":
                                fieldArray[6].point = fieldArray[6].point + 3;
                                break;
                            case "原価分析":
                                fieldArray[7].point = fieldArray[7].point + 3;
                                break;
                            case "直接原価計算":
                                fieldArray[8].point = fieldArray[8].point + 3;
                                break;
                            case "企業予算":
                                fieldArray[9].point = fieldArray[9].point + 3;
                                break;
                            case "資本予算":
                                fieldArray[10].point = fieldArray[10].point + 3;
                                break;
                            default:
                                return null
                        }
                    })
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
                                docs.map((doc) => {
                                    switch (doc.field) {
                                        case "原価管理の基礎的分類":
                                            fieldArray[0].point = fieldArray[0].point - 2;
                                            break;
                                        case "見積原価計算":
                                            fieldArray[1].point = fieldArray[1].point - 2;
                                            break;
                                        case "実際単純個別原価計算":
                                            fieldArray[2].point = fieldArray[2].point - 2;
                                            break;
                                        case "商的工業会計":
                                            fieldArray[3].point = fieldArray[3].point - 2;
                                            break;
                                        case "実際部門別個別原価計算":
                                            fieldArray[4].point = fieldArray[4].point - 2;
                                            break;
                                        case "実際総合原価計算":
                                            fieldArray[5].point = fieldArray[5].point - 2;
                                            break;
                                        case "標準原価計算":
                                            fieldArray[6].point = fieldArray[6].point - 2;
                                            break;
                                        case "原価分析":
                                            fieldArray[7].point = fieldArray[7].point - 2;
                                            break;
                                        case "直接原価計算":
                                            fieldArray[8].point = fieldArray[8].point - 2;
                                            break;
                                        case "企業予算":
                                            fieldArray[9].point = fieldArray[9].point - 2;
                                            break;
                                        case "資本予算":
                                            fieldArray[10].point = fieldArray[10].point - 2;
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
                                const strongField = newArray[0].field;
                                const weakField = newArray[10].field;
                                console.log(fieldArray)
                                MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
                                    const db = client.db(DATABASE);
                                    let status;
                                    db.collection("personal", (error, collection) => {
                                        collection.find({username: {$eq: req.query.user}}).toArray((error, docs) => {
                                            const point = plus - minus;
                                            switch (true) {
                                                case point <= 50:
                                                    status = "Beginner"
                                                    break;
                                                case point <= 100:
                                                    status = "Amateur"
                                                    break;
                                                case point <= 300:
                                                    status = "Intermediate"
                                                    break;
                                                case point <= 500:
                                                    status = "Elite"
                                                    break;
                                                case point <= 750:
                                                    status = "Professional"
                                                    break;
                                                case point <= 1000:
                                                    status = "Master"
                                                    break;
                                                case point <= 1500:
                                                    status = "Top player"
                                                    break;
                                                default:
                                                    status = "GOD"
                                                    break;
                                            }

                                            MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
                                                const db = client.db(DATABASE);
                                                let bonusPoint = 0;
                                                db.collection("personal", (error, collection) => {
                                                    collection.find({username: {$eq: req.query.user}}).toArray((error, elems) => {
                                                        for (let elem of elems) {
                                                            bonusPoint = bonusPoint + elem.bonusPoint
                                                        }
                                                        docs[0] ? docs[0].point = point + bonusPoint : 0;
                                                        docs[0] ? docs[0].status = status : "";
                                                        docs[0] ? docs[0].strongField = strongField : "";
                                                        docs[0] ? docs[0].weakField = weakField : "";
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
            })
        })
    })

})
    //得意分野の取得、ポイントの計算

module.exports = router