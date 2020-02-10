require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("build"))
app.use(morgan(function (tokens, req, res) {
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
    return arr.join(" ")
}))

const url = process.env.MONGODB_URI
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('connected to MongoDB')
    })
    .catch(e => console.error('error connecting to MongoDB:', e.message))


app.get("/", (req, res, next) => {
    res.send("<h1>Hello</h1>")
})

app.get("/info", (req, res, next) => {
    Person.find({}).then(persons => {
        const count = persons.length
        const date = Date()
        res.send(`Phonebook has info for ${count} people<br><br>${date}`)
    }).catch(e => next(e))
})

app.get("/api/persons", (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()))
    }).catch(e => next(e))
})

app.get("/api/persons/:id", (req, res, next) => {
    const id = String(req.params.id)
    Person.find({ _id: id })
        .then(person => {
            console.log("found", person)
            res.send(person)
        }).catch(e => next(e))
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = String(req.params.id)
    Person.findOne({ _id: id })
        .then(p => {
            p.delete()
            res.send(p)
        })
        .catch(e => next(e))
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body
    const name = body.name
    const number = body.number
    const person = new Person({
        name,
        number,
    })
    person.save().then(p => res.json(p.toJSON())).catch(e => next(e))
})

app.put("/api/persons/:id", (req, res, next) => {
    const id = String(req.params.id)
    const person = req.body
    console.log("updating", person, id)
    Person.findOneAndUpdate({ _id: id }, person, { runValidators: true, context: 'query' })
        .then(old => {
            console.log("updated", old, "to", person)
            res.json(person)
        }).catch(e => next(e))
})

const errorHandler = (err, req, res, next) => {
    console.error(err.name, ":", err.message)
    return res.status(500).send({ error: err.message })
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => { })
