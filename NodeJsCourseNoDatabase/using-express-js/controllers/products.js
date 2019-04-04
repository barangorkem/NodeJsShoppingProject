
const Product=require('../models/product');



exports.getAddProduct=(req,res,next)=>{

    console.log('Add Product');
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/edit-product',{
        docTitle:'Add Product',
        editing:false
    });
};

exports.postAddProduct=(req,res,next)=>{
    const product=new Product("",req.body.title,req.body.imageUrl,req.body.description,req.body.price);
    product.save();
    res.redirect('/');
}

exports.getProducts=(req,res,next)=>{
    const products=Product.fetchAll();
   res.render('admin/products',{
       prods:products,
       docTitle:'Admin Products'
   })
}

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    if(!editMode)
    {
      return  res.redirect('/');
    }
    const productId=req.params.productId;
    Product.findById(productId,product=>{
        if(product==null)
            {
                return res.redirect('/');
            }
        
        return res.render('admin/edit-product',{
            docTitle:'Edit Products',
            editing:editMode,
            product:product,
            productId:productId
        });
    });
   
}
exports.postEditProduct=(req,res,next)=>{
  
    console.log("post edit product");
    const product=new Product(req.body.productId,req.body.title,req.body.imageUrl,req.body.description,req.body.price);
    product.save();
    res.redirect('/');
   
}

exports.postDeleteProduct=(req,res,next)=>{
    const productId=req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
}



