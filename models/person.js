const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    number: String,
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', schema)

module.exports = Person
