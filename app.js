const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000
// const PORT = 5000

app.use(express.static('public'));
app.get("/", async (req, res) => {
    try {
        res.sendFile(__dirname + "/index.html");
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, "0.0.0.0", () => {
    console.log("Listening to port 5000");
})
