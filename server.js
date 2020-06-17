const express = require("express");
const app = express();


//Routes

app.get("/", (req, res) => {
    res.send("home page")
});

//users
app.post("/api/users", (req, res) => {
    res.send("post users")
})
//oaut
app.get("/api/oauth", (req, res) => {
    res.send("get oauth")
})
app.post("/api/oauth", (req, res) => {
    res.send("post oauth")
})

//contacts

app.get("/api/contacts", (req, res) => {
    res.send("get contacts")
})
app.post("/api/contacts", (req, res) => {
    res.send("post contacts")
})
app.put("/api/contacts/:id", (req, res) => {
    res.send("update contacts")
})
app.delete("/api/contacts/:id", (req, res) => {
    res.send("delete contacts")
})



//server start
app.listen(3000, () => {
    console.log(`Server is up at 3000`);
})











