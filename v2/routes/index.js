var express      = require("express"),
    router       = express.Router(),
    myFunctions  = require("../functions"),
    Client       = require("../models/client"),
    Medical       = require("../models/medical.js"),
    seedDB       = require("../seeds/seeds.js");

//seed DB
seedDB();

//GET Route


//Best way is to prb string queries one after another in embedded functions
router.get("/", function(req, res){
    //Query db for all Clients
    Client.find({}, function(err, foundClients){
        if(err){
            console.log(err);
        } else {
            //THEN query DB for all Medical rates (THEN etc.,)
            Medical.find({}, function(err, foundMedical){
                if (err) {
                    console.log(err);       
                } else {
                   res.render("index.ejs", {results: "", can: JSON.stringify(""), clients: foundClients, medical: foundMedical}); 
                }
            });
       }
    });
});


//POST Route

//post route currently doesn't work since no clients are passed from the DB to the EJS page.

router.post("/", function(req, res){
    var candidate = req.body.can;
    candidate.results = myFunctions.bigCalc(candidate);
    console.log(candidate);
    Client.find({}, function(err, foundClients){
        if(err){
            console.log(err);
        } else {
            //THEN query DB for all Medical rates (THEN etc.,)
            Medical.find({}, function(err, foundMedical){
                if (err) {
                    console.log(err);       
                } else {
                   res.render("index.ejs", {results: "", can: JSON.stringify(candidate), clients: foundClients, medical: foundMedical}); 
                }
            });
        }
    });
});



module.exports = router;