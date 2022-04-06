const express = require("express");
const fs = require("fs");
const path = require("path")

const app = express();
const port = 9000
const fFolder = `${__dirname}/../frontend`
const userFile = path.join(`${__dirname}/../frontend/users.json`)

app.use(express.json())

app.get('/', (req, res, next) => {
    res.sendFile(path.join(`${fFolder}/index.html`));
})

app.get('/admin/order-view', (req, res, next) => {
    res.sendFile(path.join(`${fFolder}/index.html`));
})

app.get('/kismacska', (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/somefile.json`));
})

app.get('/something', (request, response, next) => {
    console.log("request recieved on something endpoint");
    response.send("thank you for your request, this is our response for something endpoint")
})


app.get('/api/v1/users', (request, response, next) => {
    console.log("request recieved on users endpoint");
    response.sendFile(userFile);
})

app.get('/api/v1/users-query', (request, response, next) => {
    console.dir(request.query)
    console.log(request.query.apiKey)
    if (request.query.apiKey === "apple") {
        response.sendFile(userFile);
    } else {
        response.send("unauthorized request")
    }
})

app.get('/api/v1/users-params/:key', (req, res, next) => {
    console.dir(req.params)
    console.log(req.params.key)
    if (req.params.key === "apple") {
        res.send("you typed APPLE")
    } else {
        res.send("you did not type APPLE!")
    }
})

app.get('/api/v1/users-params/:status', (request, response, next) => {
    fs.readFile(userFile, (error, data) => {
        const users = JSON.parse(data)
        if (error) {
            request.send("problema")
        } else {
        
            if (request.params.status === "active") {
                const activeUsers = users.filter(user => user.status === "active")
                response.send(activeUsers)
            } else if (request.params.status === "passive") {
                const passiveUsers = users.filter(user => user.status === "passive")
                response.send(passiveUsers)
            } else {
                response.send(error)
            }
        }
    })
});

app.post("/users/new", (req, res) => {
    fs.readFile(userFile, (error, data) => {
        if (error) {
            console.log(error);
            res.send("un poco problema al leer de archivo de usuarios")
        } else {
            const users = JSON.parse(data);
            console.log(req.body);
            users.push(req.body);

            fs.writeFile(userFile, JSON.stringify(users), error => {
                if (error) {
                    console.log(error);
                    res.send("problema al escribir el archivo useres")
                }
            })
            res.send(req.body)
        }
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
})

app.use('/pub', express.static(`${__dirname}/../frontend/public`)); 

