const sql = require("mysql2");
const con = sql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: "",
});

con.connect((err) => {
    if (err) throw err;
    con.query("DROP DATABASE IF EXISTS RainyDay_db;", (err, res) => {
        if (err) throw err;
        console.log("database droped");
    });
    con.query("CREATE DATABASE RainyDay_db;", (err, res) => {
        if (err) throw err;
        console.log("database created");
        process.exit();
    });
});
