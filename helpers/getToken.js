const getToken = req => {
    
    const authHeader = req.headers.authorization
    if(!authHeader) return
    
    const token = authHeader.split(" ")[1]

    return token
}

module.exports = getToken