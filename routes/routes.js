const router = require("express").Router();
const {
  getAllProducts,
  newProduct,
  getProductById,
  getProductsByCategory,
  searchProduct,
  updateProduct,
  updateRepositore,
  removeProduct,
} = require("../controllers/product/Products");

const {
  newClient,
  login,
  updateClient,
  addPayamentMethod,
  getClientById,
  removePayamentMethod,
} = require("../controllers/client/Client");
const { buyAProduct } = require("../controllers/salles/sales");

const uploadImages = require("../middlewares/imageUpload");
const verifyToken = require("../middlewares/verifyToken");
const {isAdmin, getAllClients} = require("../controllers/admin/admin");
const {
  getCategory,
  newCategory,
  removeCategory,
  updateCategory,
} = require("../controllers/product/Category");

// products routes
router.get("/", getAllProducts);
router.post("/newproduct", isAdmin, uploadImages, newProduct);
router.put("/product/edit/:id", isAdmin, uploadImages, updateProduct);
router.put("/product/repositore/:id", isAdmin, updateRepositore);
router.delete("/product/delete/:id", isAdmin, removeProduct);
router.get("/searchproduct", searchProduct);
router.get("/product/:id", getProductById);
router.get("/category", getCategory);
router.get("/category/products", getProductsByCategory);
router.post('/category/newcategory', isAdmin, newCategory)
router.delete('/category/delete/:id', isAdmin, removeCategory)
router.put('/category/update/:id', isAdmin, updateCategory)
router.get('/admin/alluser', isAdmin, getAllClients)
// client routes
router.post("/signup", newClient);
router.post("/signin", login);
router.put("/client/update/:id", verifyToken, updateClient);
router.put("/client/addmethod/:id", verifyToken, addPayamentMethod);
router.delete("/client/removemethod/:id", verifyToken, removePayamentMethod);
router.get("/client/:id", verifyToken, getClientById);
router.put("/buyProduct/:id", verifyToken, buyAProduct);

module.exports = router;
