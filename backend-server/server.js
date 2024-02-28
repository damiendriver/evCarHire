const express = require("express");
const app = express();

const dbConfig = require("./db")
const carsRoute = require("./routes/carsRoute")
const membersRoute = require("./routes/membersRoute")
const bookingsRoute = require('./routes/bookingsRoute')
const chargepointsRoute = require('./routes/chargepointsRoute')

app.use(express.json())

app.use("/api/car", carsRoute)
app.use("/api/member", membersRoute)
app.use("/api/booking", bookingsRoute)
app.use("/api/chargepoints", chargepointsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running with nodemon on port ${port} `));
