const express = require("express")

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

app.post("/api/persons/:id", (req, res) => {
    const id = Math.floor(Math.random() * 2048)
    const name = req.params.name
    const number = req.params.name
    const person = {
        id,
        name,
        number,
    }
    persons = persons.concat(person)
})

app.listen(3001, () => { })
