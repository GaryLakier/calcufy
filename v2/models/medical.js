var mongoose = require("mongoose")

var medicalSchema = new mongoose.Schema({
    group: String,
    rates: [
        {
            insClass: String,
            rate: Number
        }
    ]
});

module.exports = mongoose.model("Medical", medicalSchema);