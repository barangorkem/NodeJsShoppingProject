
const express=require('express');
const router=express.Router();
const shopsController=require('../controllers/shops');

router.get('/',shopsController.getIndex);
router.get('/products',shopsController.getProducts);
router.get('/orders',shopsController.getOrders);
router.get('/cart',shopsController.getCart);
router.post('/cart',shopsController.postCart);
router.get('/products/:productId',shopsController.getProduct);
router.get('/checkout',shopsController.getCheckout);

module.exports=router;