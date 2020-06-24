
const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const Users = mongoose.model("Users");

module.exports.dashboard = function (req, res) {
  // Category.find().exec(function (err, data){
  //   console.log(data);
    
  // })
  // Product.find(err,data) => {
  //   console.log("err", err);
  //   console.log("data", data);
    
    
  // };
  res.render("admin/pages/dashboard");
};

module.exports.login = function (req, res) {
  res.render("admin/pages/login", { error: "" });
};
module.exports.postLogin = async function (req, res) {
  const email = req.body.mail;
  const pass = req.body.pass;
  const user = await Users.findOne({user_mail: email});
  
  if(user){
    if(user.user_pass===pass){
      req.session.user = user;
      return res.redirect("/admin");
    }
    res.render("admin/pages/login", {
      error: "Tài khoản không hợp lệ",
    }
    )
  }
  else{
    res.render("admin/pages/login", {
      error: "Tài khoản không hợp lệ",
    }
    )
  }
  
};

module.exports.logout = function (req,res) {
  req.session.destroy();
  return res.redirect("/login")
  
}
