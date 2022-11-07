const express = require('express');
const router = express.Router();
const {createAdmin, loginAdmin, getAdmins} = require('../controller/adminController');
const {createProduct, getProducts, getSingleProduct, updateSingleProduct, deleteSingleProduct} = require("../controller/productController");
// const upload = require('../fileUpload/uploadFile')

// Admin Api's

router.post('/register', createAdmin)
router.post('/adminLogin', loginAdmin)
router.get('/admins', getAdmins)

// product Api's

router.post('/products', createProduct)
router.get('/products', getProducts)
router.get('/products/:productId', getSingleProduct)
router.put('/products/:productId', updateSingleProduct);
router.delete('/products/:productId', deleteSingleProduct);

module.exports = router;