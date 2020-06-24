const mongoose = require("mongoose");
const Category = mongoose.model("Category");

function getCategory(req,res){
    res.render("admin/pages/category/category")
}

function getAddCategory(req,res){
    res.render("admin/pages/category/add_category")
}

function getEditCategory(req,res){
    res.render("admin/pages/category/edit_category")
}

module.exports={
    getCategory:getCategory,
    getAddCategory:getAddCategory,
    getEditCategory:getEditCategory
}