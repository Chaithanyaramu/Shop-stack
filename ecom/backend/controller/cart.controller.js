const Cart = require("../models/cart");
const Product = require("../models/product")

//Get all items in cart
exports.getCart = async(req,res) => {
    try {
        const cartItems = await Cart.find().populate("product");
        res.json(cartItems);
    }catch (err) {
        res.status(500).json({message: err.message})
    }
};

//Add item to cart
exports.addToCart = async(req,res) => {
    try {
        const {productId, quantity} = req.body;

        //check if product is present
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({message: "Product not found"})

        //checkif product is cart already
        let cartItem = await Cart.findOne({product: productId});
        if(cartItem){
            cartItem.quantity += quantity || 1;
            await cartItem.save();
            return res.json(cartItem);
        }

        //Adding new product to cart
        cartItem = await Cart.create({product: productId, quantity: quantity || 1});
        res.status(201).json(cartItem);
    }catch (err){
        res.status(400).json({message: err.message});
    }
}

//Remove from cart
exports.removeFromCart = async (req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.json({message: "Item Deleted Successfully"})
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

//Update quantity
exports.updateQuantity = async (req,res) => {
    try{
        const {quantity} = req.body;
        const cartItem = await Cart.findById(req.params.id);
        if(!cartItem) return res.status(404).json({message: "Cart item not found"})

        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem)
    }catch(err){
        res.status(500).json({message: err.message});
    }
}