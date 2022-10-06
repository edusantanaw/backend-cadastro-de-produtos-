const Client = require("../../models/client");

const {
  existsOrError,
  validEmail,
  verifyId,
  validCpf,
  validCreditCard,
  validCvv,
  validName,
} = require("../../helpers/validations");

const bcrypt = require("bcrypt");
const createClientToken = require("../../helpers/createToken");

const newClient = async (req, res) => {
  const { name, email,addressNumber, addressCity, addressStreet,  password, confirmPassword, admin } = req.body;

  try {
    existsOrError(name, "O nome é necessario!");
    validName(name)

    existsOrError(email, 'O email é invalido')
    validEmail(email, "O email é invalido!");

    existsOrError(password, "A senha é obrigatoria!");
    existsOrError(confirmPassword, "A confirmação é necessaria!");
    if(password !== confirmPassword) throw "As senhas não coecidem!"

    const clientExists = await Client.findOne({ email: email });
    if (clientExists) throw "Este email já esta sendo usado!";

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const address = {
      city: addressCity,
      street: addressStreet,
      number: addressNumber
    }

    delete confirmPassword

    const client = new Client({
      name: name,
      email: email,
      password: passwordHash,
      address: address,
      admin: admin,
    });

    const newClient = await client.save();
    createClientToken(newClient, req, res);

  } catch (err) {
    res.status(401).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    existsOrError(email, "O email é necessario!");
    existsOrError(password, "A senha é necessaria");


    const client = await Client.findOne({ email: email });
    if (!client) throw "Usuario não encontrado!";

    const verifyPassword = await bcrypt.compare(password, client.password);
    if (!verifyPassword) throw "Email/Senha invalidos";

    createClientToken(client, req, res);
  } catch (err) {
    res.status(401).send(err);
  }
};

const getClientById = async (req, res) =>{
    const id = req.params.id

    try{
      verifyId(id)
      const client = await Client.findOne({_id: id})
      if(!client) throw 'Usuario não encontrado!'

      res.status(200).send(client)

    }catch(err){
      res.status(401).send(err)
    }
}

const updateClient = async (req, res) => {
  const { name, email, addressCity, addressStreet, addressNumber} = req.body;
  const clientId = req.params.id;

  try {
    verifyId(clientId);

    const client = await Client.findOne({ _id: clientId });
    if (!client) throw "Nenhum cliente encontrado!";

    if (name) client.name = name;

    if (email && email !== client.email) {
      validEmail(email, "Email invalido!");
      const existsEmail = await Client.findOne({ email: email });
      if (existsEmail) throw "Este email já esta sendo usado!";
      client.email = email;
    }
    const address = {
      city: addressCity,
      street: addressStreet,
      number: addressNumber
    }

    if (address) client.address = address;


    await Client.findOneAndUpdate(
      { _id: client._id },
      { $set: client },
      { new: true }
    );

    res.status(200).send("Dados atualizados com sucesso!");

  } catch (err) {
    res.status(400).send(err);
  }
};

const addPayamentMethod = async (req, res) => {
  const { creditCardName, cpf, creditNumber, cvv, credits } = req.body;
  const clientId = req.params.id;

  try {
    verifyId(clientId);

    const client = await Client.findOne({ _id: clientId });
    if (!client) throw "Cliente não encontrado!";

    existsOrError(creditCardName, "O nome do cartão é necessario!");
    existsOrError(creditNumber, "O numero do cartão é necessario!");
    validCreditCard(creditNumber, "Numero do cartão invalido!");
    existsOrError(cvv, "O cvv é invalido!");
    validCvv(cvv, "Numero do cvv está invalido!");
    validCpf(cpf, "cpf invalido!");
    existsOrError(credits, 'O total de credito a ser adicionado é necessario!')

    client.cpf = cpf;

    const creditCard = {
      name: creditCardName,
      number: creditNumber,
      cvv: cvv,
      credits: credits
    };
    client.paymentMethod = creditCard;

    await Client.findOneAndUpdate(
      { _id: client._id },
      { $set: client },
      { new: true }
    );
    res.status(200).send("Metodo de pagamento adicionado com sucesso!");
  } catch (err) {
    res.status(401).send(err);
  }
};

const removePayamentMethod = async (req, res)=>{
    const id = req.params.id

    try{
      verifyId(id)
      const client = await Client.findOne({_id: id})
      if(!client) throw 'Cliente não encontrado'
      client.paymentMethod = {}
      
      await Client.findOneAndUpdate(
        {_id: client._id},
        {$set: client},
        {new: true}
      )

      res.status(200).send('Metodo de pagamanto removido com sucesso!')

    }catch(err){
      res.status(400).send(err)
    }
}

module.exports = { newClient, login, updateClient, addPayamentMethod, getClientById, removePayamentMethod };
