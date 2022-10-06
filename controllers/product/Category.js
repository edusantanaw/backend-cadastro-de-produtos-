const { existsOrError, verifyId } = require("../../helpers/validations");
const Category = require("../../models/category");
const Product = require("../../models/product");

const newCategory = async (req, res) => {
  const name = req.body.name;
  const image = req.files;

  try {
    existsOrError(name, "O nome da categoria é necessario!");

    const notExistsCategory = await Category.findOne({ name: name });

    if (notExistsCategory) throw "Esta categoria já existe!";

    const category = new Category({
      name: name,
      image: image,
    });
    await category.save();

    res.status(200).send("Categoria criada com sucesso!");
  } catch (err) {
    res.status(401).send(err);
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const image = req.files;

  try {
    verifyId(id);
    if (!name && !image) throw "Nenhum item foi alterado!";
    const category = await Category.findOne({ _id: id });
    if (!category) throw "Nenhuma categoria foi encontrada!";

    if (name) category.name = name;
    if (image) category.image = image;

    await Category.findOneAndUpdate(
      { _id: category._id },
      { $set: category },
      { new: true }
    );

    res.status(200).send("A categoria foi atualizada com sucesso!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeCategory = async (req, res) => {
  const id = req.params.id;

  try {
    verifyId(id);
    const category = await Category.findOne({ _id: id });
    if (!category) throw "Categoria não encontrada!";

    const haveProducts = await Product.find({ category: category.name });
    if (haveProducts)
      throw `Não foi possivel remover a categoria, 
        precisa remover ou atualizar os produtos desta categoria primeiro!`;

    await Category.findOneAndRemove({ _id: id });
    res.status(200).send("A categoria foi removida com sucesso!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const getCategory = async (req, res)=>{

    try{
        const categories= Category.find({})
        if(!categories) throw "nenhum categoria encontrada!"
        
        res.status(200).send(categories)

    }catch(err){
        re.status(400).send(err)
    }

}

module.exports = {
  newCategory,
  updateCategory,
  removeCategory,
  getCategory
};
