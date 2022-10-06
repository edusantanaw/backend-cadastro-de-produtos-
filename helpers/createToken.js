const jwt = require("jsonwebtoken");

const createClientToken = (client, req, res) => {

    const token = jwt.sign(
        {
            name: client.name,
            id: client._id,
        },
        'edusantanaw'
    );

    res.status(200).json({
        msg: "cliente auteticado!",
        token: token,
        client: {
            name: client.name,
            email: client.email,
            id: client._id,
        },
    });
};

module.exports = createClientToken;
