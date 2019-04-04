
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
    const product=new Product(null,req.body.title,req.body.imageUrl,req.body.description,req.body.price);
    product.save()
    .then(()=>{
        res.redirect('/');
    })
    .catch((err)=>console.log(err));
}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll()
       .then(([rows,fieldData])=>{
           console.log("rows",rows);
           console.log("fieldData",fieldData);
        res.render('admin/products',{
            prods:rows,
            docTitle:'Products'
        })
       })
       .catch((err)=>console.log(err));
}

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    if(!editMode)
    {
      return  res.redirect('/');
    }
    const productId=req.params.productId;
    Product.findById(productId).then(([product])=>{
        console.log(product);
            if(product[0]==null)
                {
                    return res.redirect('/');
                }
            return res.render('admin/edit-product',{
                docTitle:'Edit Products',
                editing:editMode,
                product:product[0],
                productId:productId
            });
        
    });
   
}
exports.postEditProduct=(req,res,next)=>{
  
    console.log("post edit product");
    const product=new Product(req.body.productId,req.body.title,req.body.imageUrl,req.body.description,req.body.price);
    product.save().then(()=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect('/');
   
}

exports.postDeleteProduct=(req,res,next)=>{
    const productId=req.body.productId;
    Product.deleteById(productId)
    .then(()=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    });
}



