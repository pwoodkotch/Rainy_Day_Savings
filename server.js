const express = require("express");
const routes = require("./controllers");
const db = require("./config/connection.js");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3334;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(routes);

db.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
