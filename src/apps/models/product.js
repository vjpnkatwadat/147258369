const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    cat_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    }, 
    prd_name: String,
    prd_image: String,
    prd_price: String,
    prd_warranty: String,
    prd_accessories: String,
    prd_new: String,
    prd_promotion: String,
    prd_status: Number,
    prd_featured: Number,
    prd_details: String

});

mongoose.model("Product", ProductSchema, "Product")