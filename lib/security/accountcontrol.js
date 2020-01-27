const {CONNECTION_URL, DATABASE, OPTIONS} = require("../../config/mongodb.config")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const MongoClient = require("mongodb").MongoClient
let initialize, authenticate;

//サーバーからフロント
passport.serializeUser((username, done) => {
    console.log(username)
    done(null, username)
})

//フロントからサーバー
passport.deserializeUser((username, done) => {
    MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        const db = client.db(DATABASE);
        db.collection("personal").findOne({
            username: username.username,
            password: username.password
        }).then((user) => {
            if (user) {
                done(null, user)
            }
        }).catch((error) => {
            done(error)
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
                    done(null, user)
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
        "local-strategy", {session: true}
    )
}


module.exports = {
    initialize,
    authenticate,
}