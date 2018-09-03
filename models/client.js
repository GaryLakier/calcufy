var mongoose = require("mongoose")

var clientSchema = new mongoose.Schema({
    name: String,
    discount: Number,
    active: Boolean
});

module.exports = mongoose.model("Client", clientSchema);