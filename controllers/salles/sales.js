const { verifyId, existsOrError } = require("../../helpers/validations");
const Client = require("../../models/client");
const Product = require("../../models/product");

const buyAProduct = async (req, res) => {
  const id = req.params.id;
  const { totals, arrayOfProducts } = req.body;
 
  try {
    verifyId(id);
    existsOrError(totals, "O total da compra é necessario!");
    existsOrError(arrayOfProducts, 'Nenhum produto encontrado!')
    
    const client = await Client.findOne({ _id: id });
    if (!client) throw "Cliente não encontrado!";
    if (client.paymentMethod.credits < totals)
      throw "Não há saldo suficiente para esta compra!";

    let totalsToPay = 0;
    
    for (let i = 0; i < arrayOfProducts.length; i++) {
     
      const product = await Product.findOne({ name: arrayOfProducts[i] });

      if (!product) throw "Produto não encontrado!";
      if (product.quantity <= 0) throw `${product.name} não esta disponivel!`;

      totalsToPay += product.price;
      product.quantity = product.quantity - 1;

      await Product.findOneAndUpdate(
        { _id: product._id },
        { $set: product },
        { new: true }
      );
    }
    client.paymentMethod.credits = client.paymentMethod.credits - totalsToPay;

    await Client.findByIdAndUpdate(
      { _id: client._id },
      { $set: client },
      { new: true }
    );

    res.status(200).send(`Compra realizada com sucesso`)

  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { buyAProduct };
