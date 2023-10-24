const express = require("express");
const routes = require("./controllers/view_routes");
const routes2 = require("./controllers/user_routes");
const db = require("./config/connection.js");
const { engine } = require("express-handlebars");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
        },
    })
);
app.use("/", routes);
app.use("/", routes2);

db.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
