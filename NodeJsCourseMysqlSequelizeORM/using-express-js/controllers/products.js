
const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {


    console.log('Add Product');
    //res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/edit-product', {
        docTitle: 'Add Product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {


    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    req.user.createProduct({
        
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description,
        
    }).then(result => {
        console.log("Created Product");
        res.redirect('/');})
        .catch(err=>console.log(err));

}

exports.getProducts = (req, res, next) => {
    req.user.getProducts().then(products=>{
        res.render('admin/products',{
            prods:products,
            docTitle:'Products'
        })
       })
       .catch((err)=>console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
   
    req.user.getProducts({where:{id:productId}}).then(product=>{
        if(!product[0])
            return res.redirect('/');
        return res.render('admin/edit-product', {
            docTitle: 'Edit Products',
            editing: editMode,
            product: product[0],
            productId: productId
            });
        
    })

}
exports.postEditProduct = (req, res, next) => {

    console.log("post edit product");
    const productId=req.body.productId;
    const updatedTitle=req.body.title;
    const updatedPrice=req.body.price;
    const updatedImageUrl=req.body.imageUrl;    
    const updatedDesc=req.body.description;

    Product.findById(productId).then(product=>{
        product.title=updatedTitle;
        product.price=updatedPrice;
        product.imageUrl=updatedImageUrl;
        product.description=updatedDesc;
        product.save();
    })
    .then(result=>{
        console.log("UPDATED PRODUCT");
        res.redirect('/admin/products');
    })
    
    .catch(err=>console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
    .then(product=>{
        product.destroy();
    }).then(()=>{
        console.log("Delete is succeeded");
        res.redirect('/admin/products');
    }).catch(err=>console.log(err));
}



