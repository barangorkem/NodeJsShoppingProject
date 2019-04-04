
let products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
    save() {
        if (this.id) {
            const productId = this.id;
            Product.findById(productId, product => {
                product.title = this.title;
                product.imageUrl = this.imageUrl;
                product.description = this.description;
                product.price = this.price;

            });
        }
        else {
            this.id = Math.floor(Math.random() * 100).toString();
            products.push(this);
        }
    }
    static fetchAll() {

        return products;
    }
    static deleteById(id) {
        const product=products.filter(item=>item.id!==id);
        products=product.slice();
    }
    static findById(id, cb) {
        const product = products.find(item => item.id == id);
        cb(product);
    }

} 