const { Router } = require("express");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
}
  
);

const checkLogin = require("../apps/middleware/checkLogin");
const checkLogout = require("../apps/middleware/checkLogout");

const { AdminController } = require("../apps/controllers");
// const AdminController = require()
// const userController = require("../apps/controllers/admin/user.controller");
const productController = require("../apps/controllers/admin/product")
const categoryController = require("../apps/controllers/admin/category")
const userController = require("../apps/controllers/admin/user")

// --Frontend
const indexController = require("../apps/controllers/site/index")


const router = Router();

//------Admin 

// router.get("/", userController.login);



router
  .route("/login")
  .get(checkLogin,AdminController.login)
  .post(checkLogin,AdminController.postLogin);

router.get("/admin",checkLogin, AdminController.dashboard);

router.use("/admin", checkLogout)
router.get("/logout", AdminController.logout)


//product
router.get("/admin/product", productController.getProduct)
router.get("/admin/product/add", productController.getAddProduct)
router.post("/admin/product/add", upload.single("prd_image"), productController.postAddProduct)
router.get("/admin/product/edit/:id", productController.getEditProduct)
router.post("/admin/product/edit/:id", productController.postEditProduct)
router.get("/admin/product/delete/:id", productController.destroy)

router.get("/admin/category", categoryController.getCategory)
router.get("/admin/category/add", categoryController.getAddCategory)
router.get("/admin/category/edit", categoryController.getEditCategory)

router.get("/admin/user", userController.getUser)
router.get("/admin/user/add", userController.getAddUser)
router.get("/admin/user/edit", userController.getEditUser)

// router.get("/admin/product", ProductController.index);
// router.get("/form", function (req, res) {
// res.render("test/form", { username: "" });
// });

// router.post("/form", function (req, res) {
// // return res.redirect("/");
// res.render("test/form", { username: req.body.username });
// });


// ----Frontend
router.get("",indexController.indexController);

router.get("/product-detail-:id", indexController.productDetail);

router.get("/category-:id", indexController.category);




module.exports = router;
