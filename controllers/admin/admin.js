const jwt = require("jsonwebtoken");
const Client = require("../../models/client");
const getToken = require("../../helpers/getToken");

const isAdmin = async (req, res, next) => {
  const token = getToken(req);
  try {
    if (!token) throw "Acesso negado!";

    const decoded = jwt.verify(token, "edusantanaw");
    const clientId = decoded.id;

    const client = await Client.findOne({ _id: clientId });
    if (!client) throw "cliente/admin não encontrado!";

    const admin = client.admin;
    if (!admin) throw "Acesso negado!";
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

const getAllClients = async (req, res) =>{

    try{
    const clients = await Client.find({})
    if(!clients) throw 'Nenhum cliente encontrado!'
    
    res.status(200).send(clients)


    }catch(err){
        res.status(400).send(err)
    }

}

module.exports = {isAdmin, getAllClients};
