
const Product=require('../models/product');
const Cart=require('../models/card');
exports.getProducts=(req,res,next)=>{

        //res.sendFile(path.join(rootDir,'views','shop.html'));
        const products=Product.fetchAll();
       res.render('shop/product-list',{
           prods:products,
           docTitle:'Shop'
       })
    
};
exports.getProduct=(req,res,next)=>{
    const productId=req.params.productId;
    Product.findById(productId,product=>{
        if(product!=null)
            {
             return   res.render('shop/product-detail',{
                    docTitle:product.title,
                    prods:product
                });
            }
        else
            {
              return  res.render('404',{
                    docTitle:'Not Found'
                });
            }
       
    });

}

exports.getIndex=(req,res,next)=>{

   res.render('shop/index',{
       docTitle:'Index'
   });

};
exports.getOrders=(req,res,next)=>{

    res.render('shop/orders',{
        docTitle:'Orders'
    });
 
 };
exports.getCart=(req,res,next)=>{
    res.render('shop/cart',{
        docTitle:'Your Cart'
    }); 
}
exports.postCart=(req,res,next)=>{
    const productId=req.body.productId;
    console.log(productId);
    Cart.addProduct(productId);
    res.redirect('/cart');
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/cart',{
        docTitle:'CheckOut'
    }); 
}


