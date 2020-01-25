const express = require("express")
const app = express()
const cors = require('cors')
const bodyPaser = require("body-parser")
const CookieParser = require("cookie-parser")
const session = require("express-session")
const accountcontrol = require("./lib/security/accountcontrol")

app.use(cors())

app.disable("x-powered-by")

app.use(CookieParser())
app.use(session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
    name: "sid"
}))


app.use(bodyPaser.urlencoded({extended: true}))
app.use(bodyPaser.json())
app.use(...accountcontrol.initialize())


app.use("/login", require("./routes/account"))
app.use("/newRegistration", require("./routes/registration"))
app.use("/modificationUserInfo", require("./routes/modification"))
app.use("/profile", require("./routes/profile"))
app.use("/ranking", require("./routes/ranking"))
app.use("/easyQuiz", require("./routes/easyQuiz"))
app.use("/intermediateQuiz", require("./routes/intermediateQuiz"))
app.use("/answerResult", require("./routes/answerResult"))

app.listen(9001)