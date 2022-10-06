const getToken = req => {
    
    const authenticate = req.headers.authorization
    const token = authenticate.split(" ")[1]

    return token
}

module.exports = getToken