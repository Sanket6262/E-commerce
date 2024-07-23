const express = require('express');
const ProductsController = require('../controller/ProductController.js')
const userController = require('../controller/UserController.js')
const authorise = require('../middleware/authorise.js')

const router = express.Router();

router.get('/getAllProducts', ProductsController.getAllProducts);
// http://localhost:5005/api/getAllProducts
router.post('/addProduct', ProductsController.addProduct);
// http://localhost:5005/api/addproduct
router.post('/Getwithquery', ProductsController.Getwithquery);
// http://localhost:5005/api/getwithquery


router.delete('/product/:id', ProductsController.deleteProducts);
// http://localhost:5005/api/product/

router.put('/product/:id', ProductsController.updateProducts);
// http://localhost:5005/api/product/

router.post('/register',userController.addUser)
router.post('/login',userController.getUser)
router.post('/getProductsWithAuth', authorise, ProductsController.getAllProducts)


module.exports = router;