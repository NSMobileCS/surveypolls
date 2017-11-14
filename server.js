const PORT = 6969;
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'ngClient/dist')));

app.use(
    session(
        {
            secret: '________DEV_SECRET=EASY_SECRET________',
        }
    )
);

require("./server/config/mongoose");

const routeRouter = require("./server/config/routes");

routeRouter(app);
app.listen(PORT, () => {
    console.log("serving on port "+PORT)
});