
const db = require('../util/database');

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
    if (this.id == null) {
      return db.execute("INSERT INTO PRODUCTS(title,imageUrl,description,price) VALUE(?,?,?,?)",
        [this.title, this.imageUrl, this.description, this.price],
      )
    }
    else {
      return db.execute("UPDATE PRODUCTS SET title=?,imageUrl=?,description=?,price=? WHERE id=?",[this.title,this.imageUrl,this.description,this.price,this.id]);
    }

  }
  static fetchAll() {
    return db.execute("SELECT * FROM PRODUCTS");
  }
  static deleteById(id) {

    return db.execute("DELETE FROM PRODUCTS WHERE id=?", [id]);
  }
  static findById(id) {

    return db.execute("SELECT * FROM PRODUCTS WHERE id=?", [id]);
  }

} 