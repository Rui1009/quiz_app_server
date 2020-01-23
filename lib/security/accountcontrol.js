const {CONNECTION_URL, DATABASE, OPTIONS} = require("../../config/mongodb.config")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const MongoClient = require("mongodb").MongoClient
let initialize, authenticate, authorize;

//サーバーからフロント
passport.serializeUser((username, done) => {
    done(null, username)
})

//フロントからサーバー
passport.deserializeUser((username, done) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("personal", (error, collection) => {
            collection.find({username: {$eq: username}}).toArray((error, users) => {
                done(null, users[0].username)
            },
                done(error)
            )
        })
    })
})

passport.use("local-strategy",
    new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
            const db = client.db(DATABASE);
            db.collection("personal").findOne({
                username: username,
                password: password
            }).then((user) => {
                if(user) {
                    done(null, user.username)
                } else {
                    done(null, false)
                }
            }).catch((error) => {
                    done(error)
            }).then(() => {
                client.close();
            })
        })
    })
    )


initialize = function () {
    return [
        passport.initialize(),
        passport.session()
    ]
}

authenticate = function () {
    return passport.authenticate(
        "local-strategy"
    )
}

// authorize = function () {
//     return function (req, res, next) {
//         if(req.isAuthenticated()) {
//             console.log("認証成功")
//         } else {
//             console.log("認証失敗")
//         }
//     }
// }

module.exports = {
    initialize,
    authenticate,
    authorize
}