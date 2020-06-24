const mongoose = require("mongoose");
require("../apps/models/category");
require("../apps/models/product");
require("../apps/models/user");
const uris = "mongodb://127.0.0.1:27017/vietpro_mongodb"

mongoose.connect(uris)