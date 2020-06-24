function detailController(req,res){
    res.render("site/product/detail")
}

function shopController(req,res){
    res.render("site/product/shop")
}

module.exports={
    detailController:detailController,
    shopController:shopController
}