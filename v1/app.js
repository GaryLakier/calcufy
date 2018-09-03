var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    methodOverride = require("method-override"),
    jsdom          = require("node-jsdom")

app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//access 'public' folder
app.use(express.static("public"));


jsdom.env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }
 
    var $ = require("jquery")(window);
});


///ROUTES

//index GET route
app.get("/", function(req, res){
    res.render("index.ejs", {results: "", can: JSON.stringify("")});
});


//index POST route
app.post("/", function(req, res){
    
    var candidate = req.body.can;
    
    //annualized revenue
    var revenueAnnualized = Number(candidate.billRate) * (2000 - (parseInt(candidate.vacDays) * 8)) * (1 - (Number(candidate.discountRate)/100));
    console.log("Annualized revenue: " + revenueAnnualized);
    
    //EXPENSES
    
    //Compensation expense
    
    if(candidate.compType === "hourly"){
        var compensationAnnualized = candidate.compRate * 2000;
    } else {
        var compensationAnnualized = candidate.compRate;
    }
    
    console.log("Annualized compensation expense: " + compensationAnnualized);
    
    // HEALTH INSURANCE EXPENSE SECTION
    
    //candidate health insurance
    if (candidate.empHealth === "on") {
        var candidateAge = getAge(candidate.empDOB);
        //NEED TO CHANGE TO LOOKUP AMOUNT IN DB
        var candidateHealthInsurance = 250
    } else {
        var candidateHealthInsurance = 0;
    }

    //spouse health insurance
    
    if (candidate.spoHealth === "on") {
        var spouseAge = getAge(candidate.spoDOB);
        //NEED TO CHANGE TO LOOKUP AMOUNT IN DB
        var spouseHealthInsurance = 250
    } else {
        var spouseHealthInsurance = 0;
    }
    
    //children health insurance
    
    if (candidate.chiHealth === "on") {
        //NEED TO CHANGE TO LOOKUP AMOUNT IN DB
        var childrenMedicalExpense = parseInt(candidate.children) * 100;
    } else {
        var childrenMedicalExpense = 0;
    }
    
    //Dental
    if (candidate.dental==="dentEmp") {
        var dentalExpense = 50
    } else if (candidate.dental==="dentEmpSpo") {
        var dentalExpense = 100
    } else if (candidate.dental==="dentEmpChi") {
        var dentalExpense = 150
    } else if (candidate.dental==="dentFamily") {
        var dentalExpense = 200
    } else {
        var dentalExpense = 0
    }
    
    
    
    //Vision
    if (candidate.vision==="visEmp") {
        var visionExpense = 50
    } else if (candidate.vision==="visEmpSpo") {
        var visionExpense = 100
    } else if (candidate.vision==="visEmpChi") {
        var visionExpense = 150
    } else if (candidate.vision==="visFamily") {
        var visionExpense = 200
    } else {
        var visionExpense = 0
    }
    
    //compute total healthcare cost and allocate to employee and employer
    
    var healthcare = candidateHealthInsurance + spouseHealthInsurance + childrenMedicalExpense + dentalExpense + visionExpense
    console.log("Total medical expense: " + healthcare)
    
    var employerSponsorRatio = 0.60
    
    var employerHealthcare = healthcare * employerSponsorRatio
    var candidateHealthcare = healthcare - employerHealthcare
    
    console.log("Employer pays monthly for health insurance: " + employerHealthcare)
    console.log("Candidate pays monthly for health insurance: " + candidateHealthcare)
    
    var employerHealthcareAnnualized = employerHealthcare * 12
    
    
    //TAXES Section
    
    //Taxes Section 1: FICA
    
    if (compensationAnnualized > 106000) {
        var FICA = 0.062 * 106000;
    } else {
        var FICA = 0.062 * compensationAnnualized;
    }
    
    //Taxes Section 2: Medicare, Workers Comp & unemployment
    
    var medicare = compensationAnnualized * 0.0145
    var workersComp = compensationAnnualized * 0.008
    var SUTA = 0.027 * 9500
    var FUTA = 0.033 * 7000
    var unemployment = SUTA + FUTA
    var taxes = FICA + medicare + workersComp + unemployment 
    
    console.log(
        "TAXES---->| FICA: " + FICA,
        "| Medicare: " + medicare,
        "| SUTA: " + SUTA,
        "| FUTA: " + FUTA,
        "| Total taxes: " + taxes
        )
        
    
    //final calcs
    
    var results = new Object();
        results.revenueAnnualized = revenueAnnualized
        results.expenseAnnualized = Number(compensationAnnualized) + Number(employerHealthcareAnnualized) + Number(taxes) 
        results.profitAnnualized = results.revenueAnnualized - results.expenseAnnualized
        results.profitHourly = results.profitAnnualized / 2000
        results.profitMargin = parseInt(results.profitAnnualized / results.revenueAnnualized * 100)
        results.candidateHealthcare = candidateHealthcare

    console.log(candidate)
    console.log("Total revenue is $" + results.revenueAnnualized)
    console.log("Total expenses are $" + results.expenseAnnualized)
    console.log("Hourly profit is $" + results.profitHourly)
    console.log("Profit margin is " + results.profitMargin + "%")

    res.render("index.ejs", {results: results, can: JSON.stringify(candidate)});
});



function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App now running...")
});