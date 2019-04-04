
const Product=require('../models/product');
const Cart=require('../models/card');
exports.getProducts=(req,res,next)=>{

        //res.sendFile(path.join(rootDir,'views','shop.html'));
       Product.fetchAll()
       .then(([rows,fieldData])=>{
        res.render('shop/product-list',{
            prods:rows,
            docTitle:'Shop'
        })
       })
       .catch((err)=>console.log(err));
      
       
    
};
exports.getProduct=(req,res,next)=>{
    const productId=req.params.productId;
    Product.findById(productId)
    .then(([product])=>{
        
                 return   res.render('shop/product-detail',{
                        docTitle:product.title,
                        prods:product[0]
                    });
        
           
        
    })
    .catch((err)=>console.log(err));

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
    Cart.addProduct(productId);
    res.redirect('/cart');
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/cart',{
        docTitle:'CheckOut'
    }); 
}


