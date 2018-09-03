var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    methodOverride = require("method-override")
    
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/cost_calc")


//candidate Schema
var candidateSchema = new mongoose.Schema({
    name: String,
    title: String
});

var Candidate = mongoose.model("Candidate", candidateSchema);

// var clientSchema = new mongoose.Schema({
//     name: String,
//     discount: Number,
//     active: Boolean
// });

// var Client = mongoose.model("Client", clientSchema);

// Client.create({name: "Test1, LLC", discount: 0.05, active: true}, function(err, client){if(err){console.log(err)}else{console.log(client)}});




// var bond = new Candidate({
//     name: "James Bond",
//     title: "Spy"
// });

// bond.save(function(err, candidate){
//     if (err){
//         console.log(err);
//     } else {
//         console.log(candidate);
//         console.log(Candidate.find());
//     }
// });

// Candidate.create({
//     name: "Jack Smith",
//     title: "Woodsmith"
// }, function(err, candidate){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(candidate);
//     }
// });

// Candidate.find({}, function(err, candidates){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(candidates);
//     }
// });


app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//access 'public' folder
app.use(express.static("public"));

//require Routes
var indexRoutes = require("./routes/index")

///ROUTES
app.use("/", indexRoutes)

app.listen(process.env.PORT || '3000', process.env.IP || '0.0.0.0', function(){
    console.log("App now running...")
});