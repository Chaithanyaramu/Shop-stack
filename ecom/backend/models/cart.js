const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    user: {
        type: String,
        default: "guest"
    },
}, {timestamps: true});
module.exports = mongoose.model("Cart", cartSchema);