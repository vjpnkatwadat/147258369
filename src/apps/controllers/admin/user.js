function getUser(req,res){
    res.render("admin/pages/user/user")
}
function getAddUser(req,res){
    res.render("admin/pages/user/add_user")
}
function getEditUser(req,res){
    res.render("admin/pages/user/edit_user")
}

module.exports={
    getUser:getUser,
    getAddUser:getAddUser,
    getEditUser:getEditUser
}