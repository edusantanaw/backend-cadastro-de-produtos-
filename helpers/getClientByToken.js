const jwt = require('jsonwebtoken')
const Client = require('../models/client')

const getUserByToken = async (token) => {
    if (!token) throw res.status(401).send({ message: 'Acesso negado!' })
    const decoded = jwt.verify(token, 'edusantanaw')
    const clientId = decoded.id
    const client = await Client.findOne({ _id: clientId })
    return client
}

module.exports = getUserByToken