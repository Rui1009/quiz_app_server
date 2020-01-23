const express = require("express")
const app = express()
const cors = require('cors')
const bodyPaser = require("body-parser")

app.use(cors())

app.disable("x-powered-by")

app.use(bodyPaser.urlencoded({extended: true}))
app.use(bodyPaser.json())

app.use("/profile", require("./routes/profile"))
app.use("/ranking", require("./routes/ranking"))
app.use("/easyQuiz", require("./routes/easyQuiz"))
app.use("/intermediateQuiz", require("./routes/intermediateQuiz"))
app.use("/answerResult", require("./routes/answerResult"))

app.listen(9001)