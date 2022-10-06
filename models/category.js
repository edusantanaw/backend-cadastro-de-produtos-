const mongoose = require('../db/db')
const {Schema} = require('mongoose')

const Category = mongoose.model(
    'Category',
    new Schema({
        name:{
            type: String,
            required: true
        },
        image:{
            type: Object
        }
    })
)


module.exports = Category