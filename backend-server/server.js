const express = require("express");

const app = express();

const dbConfig = require("./db")
const carsRoute = require("./routes/carsRoute")
const membersRoute = require("./routes/membersRoute")

app.use(express.json())

app.use("/api/cars", carsRoute)
app.use("/api/member", membersRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running with nodemon on port ${port} `));