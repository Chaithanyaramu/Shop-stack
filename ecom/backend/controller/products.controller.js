const Product = require("../models/product");

//GET
exports.getProducts = async(req, res) => {
    try {
        let products = await Product.find();

        //Filter
        if(req.query.category) {
            products = products.filter(
                (p) => p.category.toLocalLowerCase() === req.query.category.toLocalLowerCase()
            )
        }
        //SORT
        if(req.query.sort === "low-high") {
            products.sort((a,b) => a.price - b.price);
        }else if(req.query.sort === "high-low") {
            products.sort((a,b) => b.price - a.price);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//POST
exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const newProduct = new Product({ name, price, description, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
};

//UPDATE
exports.updateProduct = async(req, res) => {
    try{
        const {id} = req.params;
        const {name, price, description, category} = req.body;

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {name,price,description,category},
            {new: true} //new updated doc
        )

        if(!updateProduct){
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(updateProduct);
    }catch(error){
        return res.status(404).json({ message: error.message })
    }
}

//DELETE
exports.deleteProduct = async(req,res)=> {
    try{
        const {id} = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);

        if(!deleteProduct){
            return res.status(404).json({ message: "Product not found" })
        }
        res.json({message: "Product Deleted Successfully!"})
    }catch(error){
        return res.status(400).json({ message: error.message })
    }
}