
const Product=require('../models/product');

let products = [];
let totalPrice=0;

module.exports=class Cart{

    constructor()
        {

        }
    static addProduct(id)
        {
            Product.findById(id,product=>{
                products.push(product);
                totalPrice=+totalPrice + +product.price;
                console.log(products,totalPrice);
            })
          
        }
        static fetchAll() {

            return products;
        }
        static deleteProduct(id,price)
            {
               let newProducts =products.filter(item=>item.id!==id);
               products=newProducts.slice();
            }
}