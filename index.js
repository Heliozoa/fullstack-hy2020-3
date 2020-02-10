const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
]

const app = express()

const logger = morgan(function (tokens, req, res) {
    let arr = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"), "-",
        tokens["response-time"](req, res), "ms"
    ]
    if (req.method === "POST") {
        const data = req.body
        arr.push(JSON.stringify(data))
    }
    console.log(arr)
    return arr.join(" ")
})

app.use(logger)
app.use(express.json())
app.use(cors())
app.use(express.static("build"))

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>")
})

app.get("/info", (req, res) => {
    const count = persons.length
    const date = Date()
    res.send(`Phonebook has info for ${count} people<br><br>${date}`)
})

app.get("/api/persons", (req, res) => {
    res.send(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        console.log("found", person)
        res.send(person)
    } else {
        console.error("no person found with id", id)
        res.status(404).end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        persons = persons.filter(p => p.id !== id)
        console.log("found", person)
        res.send(person)
    } else {
        console.error("no person found with id", id)
        res.status(404).end()
    }
})

app.post("/api/persons", (req, res) => {
    const id = Math.floor(Math.random() * 2048)
    const body = req.body
    const name = body.name
    if (!name) {
        return res.status(400).json({
            error: "missing name",
        })
    }
    const existing = persons.find(p => p.name === name)
    if (existing) {
        return res.status(400).json({
            error: `person with name ${name} already exists in the database`
        })
    }
    const number = body.number
    if (!number) {
        return res.status(400).json({
            error: "missing number",
        })
    }
    const person = {
        id,
        name,
        number,
    }
    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { })
