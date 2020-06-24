const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Category = mongoose.model("Category");
const fs = require("fs");
const path = require("path")
const joi = require("@hapi/joi");
const session = require("express-session");


async function getProduct(req,res){
  const page = parseInt(req.query.page) ;
  const limit = 2;
  const skip = (page-1)*limit;
  const totalDocuments = await Product.find().countDocuments();
  const totalPage = Math.ceil(totalDocuments/limit);
  const range = [];
  const rangeForDot = [];
  const detal = 2;
  const left = page - detal;
  const right = page + detal;
  for(let i=1;i<=totalPage;i++){
    if(i==1 || i==totalPage || (i>=left && i <= right) ){
      range.push(i);
    }
  }

  let temp;
  range.map((i)=>{
    if(temp && (i-temp) !==1){
      rangeForDot.push("...");
    }
    temp = i;
    rangeForDot.push(i);
  })
  const products=await Product.find().populate("cat_id").sort("-_id").limit(limit).skip(skip);
  // console.log("req.params", req.params);
  // console.log("req.query", req.query);
  // console.log(req.session.user);
  

  res.render("admin/pages/product/product",{products, range:rangeForDot})
}
async function getAddProduct(req,res){
  const categories= await Category.find();
  res.render("admin/pages/product/add_product", {categories})
}

async function postAddProduct(req,res){

  const bodySchema = joi.object({
    prd_name:joi.string().required(),
    prd_price:joi.number().required(),
  }).unknown();
  const value= await bodySchema.validateAsync(req.body)
  if(value instanceof Error){
    return res.redirect("/admin/product/add")
  }

  const file = req.file;
  const pathUpload=path.resolve("src", "public", "admin", "img");
  const contentFile = fs.readFileSync(file.path)
  fs.unlinkSync(file.path)

  fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile);

  const product = new Product({
    prd_name:value.prd_name,
    cat_id:value.cat_id,
    prd_image:file.originalname,
    prd_price:value.prd_price,
    prd_warranty:value.prd_warranty,
    prd_accessories:value.prd_accessories,
    prd_promotion:value.prd_promotion,
    prd_new:value.prd_new,
    prd_status:value.prd_status,
    prd_featured:value.prd_featured,
    prd_details:value.prd_details
  });

  await product.save();

  

  return res.redirect("/admin/product");
  
}

async function getEditProduct(req,res){
  const {id}= req.params;
  const product = await Product.findById(id);
  const categories= await Category.find();
  res.render("admin/pages/product/edit_product",{product, categories})
}

async function postEditProduct(req,res){
 const {id}=req.params;
 const bodySchema = joi.object({
  prd_name:joi.string().required(),
  prd_price:joi.number().required(),
}).unknown();
const value= await bodySchema.validateAsync(req.body)
if(value instanceof Error){
  return res.redirect("/admin/product/add")
}

const file = req.file;
const pathUpload=path.resolve("src", "public", "admin", "img");
const contentFile = fs.readFileSync(file.path)
fs.unlinkSync(file.path)

fs.writeFileSync(path.join(pathUpload, file.originalname), contentFile);


 const productupdate = {
    prd_name:value.prd_name,
    cat_id:value.cat_id,
    prd_price:value.prd_price,
    prd_warranty:value.prd_warranty,
    prd_accessories:value.prd_accessories,
    prd_promotion:value.prd_promotion,
    prd_new:value.prd_new,
    prd_status:value.prd_status,
    prd_featured:value.prd_featured,
    prd_details:value.prd_details
 }

 if(file){
    productupdate["prd_image"]=file.originalname;
 }
 await Product.updateOne({_id:id},productupdate);


 return res.redirect("/admin/product");
}

async function destroy(req, res){
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.redirect("/admin/products");
  }

  const product = await Product.findByIdAndDelete(id);
  if (product) {
    const pathUpload = path.resolve("src", "public", "images", "products");
    if (fs.existsSync(path.join(pathUpload, product.prd_image))) {
      fs.unlinkSync(path.join(pathUpload, product.prd_image));
    }
  }

  return res.redirect("/admin/product");
}

module.exports={
  getProduct:getProduct,
  getAddProduct:getAddProduct,
  getEditProduct:getEditProduct,
  postAddProduct:postAddProduct,
  destroy:destroy,
  postEditProduct:postEditProduct
}