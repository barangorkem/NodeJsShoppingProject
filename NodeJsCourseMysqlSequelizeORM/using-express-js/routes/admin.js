const express=require('express');
//const path=require('path');
//const rootDir=require('../util/path');
const router=express.Router();
const productsController=require('../controllers/products');

router.get('/add-product',productsController.getAddProduct);

router.get('/products',productsController.getProducts);

router.post('/add-product',productsController.postAddProduct);

router.get('/edit-product/:productId',productsController.getEditProduct);

router.post('/edit-product',productsController.postEditProduct);

router.post('/delete-product',productsController.postDeleteProduct);

module.exports=router;