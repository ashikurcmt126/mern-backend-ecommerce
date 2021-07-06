const Cart = require('../models/cart')

exports.addItemToCart = (req, res) =>{

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) =>{
        if(error) return res.status(400).json({error})

        if(cart){
            //if cart already exists then update cart by quantity

            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);
            let condition, update;
            if(item){
                //IF item exists, we are selecting the cart based on the userId and 
                // we are selecting the product based on the productId 
                condition = { "user": req.user._id, "cartItems.product": product};
                update = {
                    "$set": {
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }
                
            }else{ 
               condition = {user: req.user._id};
               update = {
                   "$push": {
                       "cartItems": req.body.cartItems
                   }
               }
            }
            Cart.findOneAndUpdate(condition, update)
            .exec((error, _cart)=>{
                if(error) return res.status(400).send({msg: error})
                if(_cart){
                    return res.status(201).json({cart: _cart})
                }
            })
        }else{
            //If cart not exists then create new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            })
        
            cart.save((error, cart)=>{
                if(error) return res.status(400).json({error})
                if(cart){
                    return res.status(201).json({cart})
                }
            })
        }
    })
    
}

/*
exports.addItemToCart = (req, res) =>{

    Cart.findOne({ user: req.user._id })
    .exec((error, cart) =>{
        if(error) return res.status(400).json({error})

        if(cart){
            //if cart already exists then update cart by quantity

            const product = req.body.cartItems.product;
            const item = cart.cartItems.find(c => c.product == product);

            if(item){
                //IF item exists, we are selecting the cart based on the userId and 
                // we are selecting the product based on the productId 
                Cart.findOneAndUpdate( { "user": req.user._id, "cartItems.product": product},{
                    "$set": {
                        "cartItems.$": {      //carItems.$ == only updated the product only
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                })
                .exec((error, _cart)=>{
                    if(error) return res.status(400).json({error})
    
                    if(_cart) return res.status(201).json({_cart})
                })
            }else{ 
                Cart.findOneAndUpdate({user: req.user._id},{
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart)=>{
                    if(error) return res.status(400).json({error})
                    if(_cart){
                        return res.status(201).json({cart: _cart})
                    }
                })
            }
            
            
        }else{
            //If cart not exists then create new cart
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            })
        
            cart.save((error, cart)=>{
                if(error) return res.status(400).json({error})
                if(cart){
                    return res.status(201).json({cart})
                }
            })
        }
    })
    
}

*/