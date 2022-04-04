const express = require("express");
const fs = require("fs");
const path = require("path")

const app = express();
const port = 9000

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
})

app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
})

app.get('/something', (request, response, next) => {
    console.log("request recieved on something endpoint");
    response.send("thank you for your request, this is our response for something endpoint")
})

const userFile = path.join(`${__dirname}/../frontend/users.json`)

app.get('/api/v1/users/active', (request, response, next) => {
    fs.readFile(userFile, (error, data) => {
        if (error) {
            response.send(error)
        } else {
            const users = JSON.parse(data)
            const activeUsers = users.filter(user => user.status === "active")
            response.send(activeUsers)
        }
    })
});

app.get('/api/v1/users/passive', (request, response, next) => {
    fs.readFile(userFile, (error, data) => {
        if (error) {
            response.send("error happened")
        } else {
            const users = JSON.parse(data)
            const passiveUsers = users.filter(user => user.status === "passive")
            response.send(passiveUsers)
        }
    })
})

app.get('/api/v1/users', (request, response, next) => {
    console.log("request recieved on users endpoint");
    response.sendFile(userFile);
})

app.use('/pub', express.static(`${__dirname}/../frontend/public`)); //statikus mappa kiszolgálás, ez úgy ahogy van látható a servernek. nem szerencsés betenni az indexet ide.

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})


