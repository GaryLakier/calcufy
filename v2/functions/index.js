

//establish variable to hold all functions
var myfunctionsObj = {};


//establish link to DB medical benis
var Medical = require("../models/medical.js");

//get age function
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


//The BIG Calc
myfunctionsObj.bigCalc = function(candidate){
    //setup results object
    var results = {
        interim:{},
        final:{}
    };
    
    //annualize revenue
    results = annualizeRevenue(candidate, results);
    
    //EXPENSES
    results = annualizeCompensation(candidate, results);
    
    // HEALTH INSURANCE EXPENSE SECTION
    results = calcHealthBenefits(candidate, results);
    
    //TAXES Section
    results = calcTaxes(candidate, results);
    
    //final calcs
    results = finalCalcs(candidate, results);

    return results;
}

//annualize revenue
function annualizeRevenue (candidate, results){
    if (candidate.vacDays === '') { 
        candidate.vacDays = 0
    }
    var revenueAnnualized = Number(candidate.billRate) * (2000 - (parseInt(candidate.vacDays) * 8)) * (1 - (Number(candidate.discountRate)/100));
    results.interim.revenueAnnualized = revenueAnnualized;
    return results;
};

function annualizeCompensation(candidate, results){
    if(candidate.compType === "hourly"){
        var compensationAnnualized = candidate.compRate * 2000;
    } else {
        var compensationAnnualized = candidate.compRate;
    }
    results.interim.compensationAnnualized = compensationAnnualized;
    return results;
};


//candidate health insurance
function calcCandidateHealthInsurance(candidate, results){ 
    if (candidate.empHealth === "on") {
        var candidateAge = getAge(candidate.empDOB);
        //NEED TO CHANGE TO LOOKUP AMOUNT IN DB
        console.log(candidateAge);
        
        var candidateHealthInsurance = 250;
    } else {
        var candidateHealthInsurance = 0;
    }
    results.interim.candidateHealthInsurance = candidateHealthInsurance
    return results;
}

//Spouse health insurance
function calcSpouseHealthInsurance(candidate, results){
    if (candidate.spoHealth === "on") {
        var spouseAge = getAge(candidate.spoDOB);
        //NEED TO CHANGE TO LOOKUP AMOUNT IN DB
        var spouseHealthInsurance = 250;
    } else {
        var spouseHealthInsurance = 0;
    }
    results.interim.spouseHealthInsurance = spouseHealthInsurance;
    return results;
}

//children medical expense
function calcChildrenMedicaExpense(candidate, results){  
    if (candidate.chiHealth === "on") {
        //NEED TO CHANGE TO LOOKUP AMOUNT IN DB
        var childrenMedicalExpense = parseInt(candidate.children) * 100;
    } else {
        var childrenMedicalExpense = 0;
    }
    results.interim.childrenMedicalExpense = childrenMedicalExpense;
    return results;
}


//Dental expense
function calcDentalExpense(candidate, results){
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
    results.interim.dentalExpense = dentalExpense;
    return  results;
}
    
    
//Vision expense
function calcVisionExpense(candidate, results){
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
    results.interim.visionExpense = visionExpense;
    return results;
}

//combine all health benefits calcs

function calcHealthBenefits(candidate, results){
    results = calcCandidateHealthInsurance(candidate, results);
    results = calcSpouseHealthInsurance(candidate, results);
    results = calcChildrenMedicaExpense(candidate, results);
    results = calcDentalExpense(candidate, results);
    results = calcVisionExpense(candidate, results);
    
    //compute total healthcare cost and allocate to employee and employer
    results.interim.healthcare = results.interim.candidateHealthInsurance + results.interim.spouseHealthInsurance + results.interim.childrenMedicalExpense + results.interim.dentalExpense + results.interim.visionExpense
    
    // To be provided by DB
    var employerSponsorRatio = 0.60
    
    results.interim.employerHealthcare = results.interim.healthcare * employerSponsorRatio
    results.interim.candidateHealthcare = results.interim.healthcare - results.interim.employerHealthcare

    results.interim.employerHealthcareAnnualized = results.interim.employerHealthcare * 12
    
    return results;
}

//TAXES SECTION

//Fica

//Taxes Section 1: FICA
function calcFICA(candidate, results){    
    if (results.interim.compensationAnnualized > 106000) {
        results.interim.FICA = 0.062 * 106000;
    } else {
        results.interim.FICA = 0.062 * results.interim.compensationAnnualized;
    }
    return results;
}
    
//Taxes Section 2: Medicare, Workers Comp & Unemployment
    
function calcMedicare(candidate, results){
    results.interim.medicare = results.interim.compensationAnnualized * 0.0145
    return results
} 

function calcWorkersComp(candidate, results){
    results.interim.workersComp = results.interim.compensationAnnualized * 0.008
    return results
} 

function calcUnemployment(candidate, results){
    results.interim.SUTA = 0.027 * 9500
    results.interim.FUTA = 0.033 * 7000
    results.interim.unemployment = results.interim.SUTA + results.interim.FUTA
    return results
} 

//Tax compilation
function calcTaxes(candidate, results){
    results = calcFICA(candidate, results)
    results = calcMedicare(candidate, results)
    results = calcWorkersComp(candidate, results)
    results = calcUnemployment(candidate, results)
    
    results.interim.taxes = Number(results.interim.FICA) + Number(results.interim.medicare) + Number(results.interim.workersComp) + Number(results.interim.unemployment)

    return results;
    
}

function finalCalcs(candidate, results){
    //Note: called 'expenseAnnualized' to match 'revenueAnnualized'
    results.interim.expenseAnnualized = Number(results.interim.compensationAnnualized) + Number(results.interim.employerHealthcareAnnualized) + Number(results.interim.taxes) 
    results.interim.profitAnnualized = results.interim.revenueAnnualized - results.interim.expenseAnnualized;
    results.interim.profitHourly = results.interim.profitAnnualized / 2000
    results.interim.profitMargin = parseInt(results.interim.profitAnnualized / results.interim.revenueAnnualized * 100)
    
    return results;
}

//needed anymore?
module.exports = myfunctionsObj;