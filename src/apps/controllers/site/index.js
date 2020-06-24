const mongoose = require("mongoose")
const ProductModel = mongoose.model("Product")
const CategoryModel = mongoose.model("Category")



async function indexController(req,res){
    const ProductFeatured = await ProductModel.find({prd_featured:1}).limit(6).sort("-_id");
    const ProductNew = await ProductModel.find({prd_featured:0}).limit(6).sort("-_id");

    res.render("site/index",{ProductFeatured,ProductNew})
}


async function productDetail(req,res) {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.redirect("/");
    }
    const product =await ProductModel.findById(id);

    res.render("site/pages/product", {product})
}

async function category(req,res) {
    const {id} = req.params;
    const category =await CategoryModel.findById(id);
    const products = await ProductModel.find({cat_id:id})
    res.render("site/pages/category", {category, products})
}

module.exports = {
    indexController:indexController,
    productDetail:productDetail,
    category:category
}