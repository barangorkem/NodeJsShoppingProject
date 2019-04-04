const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const rootDir=require('./util/path');
const app=express();
const errorController=require('./controllers/error');
const sequelize=require('./util/database');
const Product=require('./models/product');
const User=require('./models/users');
const Cart=require('./models/card');
const CartItem=require('./models/cart-item');
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootDir,'public')));

app.use((req,res,next)=>{
    User.findById(1)
    .then(user=>{
        req.user=user;
        next();
    }).catch(err=>console.log(err));
});


app.use('/admin',adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
//sequelize.sync({force:true}).
sequelize.sync().
then(result=>{
   return User.findById(1);
}).then(user=>{
    if(!user){
        return User.create({name:'Max',email:'test@test.com'});
    }
    return user;
}).then(user=>{

   return user.createCart();
}).then(cart=>{
    app.listen(8080);
})
.catch(err=>{
    console.log(err);
})

