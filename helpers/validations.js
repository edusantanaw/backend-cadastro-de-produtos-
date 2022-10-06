const ObjectId = require('mongoose').Types.ObjectId

const validName = (value)=>{
    const regex = /^[a-zA-Zá-ú]+$/
    if(!(regex.test(value))) throw 'nome invalido!'
    
}

const existsOrError = (value, msg) =>{
    if(!value) throw msg
    if(Array.isArray(value) && value.length ===0) throw msg
}

const validEmail = (email, msg) => {
    const regex = /\S+@\S+\.\S+/;
    if (!(regex.test(email))) throw msg
}

const validCpf = (cpf, msg)=>{
    const regex = /^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/
    if(!(regex.test(cpf))) throw msg
}

const verifyId = (id) => {
    const msg = 'id invalido!'
    if (!ObjectId.isValid(id)) throw msg
}

const validCreditCard = (creditCard, msg)=>{
    const regex = /[0-9]{13}/;
    if(!(regex.test(creditCard))) throw msg
}

const validCvv = (cvv, msg)=>{
    const regex = /^[0-9]{3}$/;
    if(!(regex.test(cvv))) throw msg
}

module.exports = {existsOrError, validEmail, verifyId, validCpf, validCreditCard, validCvv, validName }