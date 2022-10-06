const Product = require("../../models/product");
const { existsOrError } = require("../../helpers/validations");
const { verifyId } = require("../../helpers/validations");
const Category = require("../../models/category");

const newProduct = async (req, res) => {
    const { category, brand, name, price, quantity } = req.body;
    const images = req.files;

    try {
        existsOrError(category, "A categoria é necessaria!");
        existsOrError(brand, "A marca é necessaria");
        existsOrError(name, "O nome é necessario!");
        existsOrError(price, "O preço é necessari!");
        existsOrError(images, "A imagem é necessaria");

        const arrayImagens = images.map((image) => (image = image.filename));

        name = name.toUpperCase();

        const product = new Product({
            category: category,
            brand: brand,
            name: name,
            price: price,
            quantity: quantity,
            image: arrayImagens,
        });

        await product.save();
        res.status(200).send("Produto cadastrado com sucesso!");
    } catch (err) {
        res.status(400).send(err);
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        verifyId(id);

        const product = await Product.findOne({ id: id });
        if (!product || product.length <= 0) throw "Nenhum produto encontrado !";

        res.status(200).send(product);
    } catch (err) {
        res.status(401).send(err);
    }
};

const searchProduct = async (req, res) => {
    const name = req.body.name;

    try {
        existsOrError(name, "Digite o nome do produto!");
        const products = await Product.find({
            name: { $regex: ".*" + name + ".*" },
        });
        if (!products || products.length <= 0) throw "Nenhum produto encontrado!";

        res.status(200).send(products);
    } catch (err) {
        res.status(401).send(err);
    }
};

const getProductsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        verifyId(categoryId);
        const category = await Category.find({ id: categoryId });

        if (!category || category.length <= 0) throw "Categoria não encontrada";

        const categoryName = category.name;

        const products = await Product.findOne({ category: categoryName });

        if (!products || products.length <= 0) throw "Nenhum produto encontrado";

        res.status(201).send(products);
    } catch (err) {
        res.status(401).send(err);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products || products.lenght <= 0) throw "Nenhum produto encontrado!";

        res.status(201).send(products);
    } catch (err) {
        res.status(401).send(err);
    }
};

const updateProduct = async (req, res) => {
    const { category, brand, name, price, quantity } = req.body;
    const id = req.params.id;

    try {
        verifyId(id);
        const product = await Product.findOne({ _id: id });
        if (!product) throw "Produto não encontrado!";

        existsOrError(category, "A categoria é necessaria!");
        existsOrError(brand, "A marca é necessaria!");
        existsOrError(name, "O nome do produto é necessario!");
        existsOrError(price, "O preço do produto é necessario!");

        product.category = category;
        product.brand = brand;
        product.name = name;
        product.price = product.price;
        if (quantity) product.quantity = quantity;

        await Product.findOneAndUpdate(
            { _id: product._id },
            { $set: product },
            { new: true }
        );
        res.status(200).send("Produto atualizado com sucesso!");
    } catch (err) {
        res.status(401).send(err);
    }
};

const removeProduct = async (req, res) => {
    const id = req.params.id;
    try {
        verifyId(id);
        const product = await Product.findOne({ _id: id });
        if (!product) throw "Produto não existe!";
        await Product.findOneAndRemove({ _id: id });

        res.status(201).send("Produto excluido com sucesso !");
    } catch (err) {
        res.status(401).send("Produto removido com sucesso!");
    }
};

const updateRepositore = async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;

    try {
        verifyId(id);
        existsOrError(quantity, "A quantidade de produtos é necessaria!");
        const product = await Product.findOne({ _id: id });
        if (!product) throw "Produto não encontrado!";

        product.quantity = quantity;

        await Product.findOneAndUpdate(
            { _id: product._id },
            { $set: product },
            { new: true }
        );
        res.status(201).send("Produto atualizado com sucesso!");
    } catch (err) {
        res.status(401).send(err);
    }
};

module.exports = {
    newProduct,
    getProductById,
    searchProduct,
    getProductsByCategory,
    getAllProducts,
    updateProduct,
    removeProduct,
    updateRepositore,
};
