const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('insufficient args')
    process.exit(1)
}

const schema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', schema)

const password = process.argv[2]
const url =
    `mongodb+srv://admin:${password}@cluster0-a7v7w.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


if (process.argv.length < 5) {
    Person.find({}).then(persons => {
        console.log("phonebook:")
        persons.forEach(person => console.log(person.name, person.number))
        mongoose.connection.close()
    })
} else {
    const [name, number] = process.argv.slice(3, 5)
    const person = new Person({
        name,
        number,
    })

    person.save().then(person => {
        console.log("added", name, "number", number, "to phonebook")
        mongoose.connection.close()
    })
}