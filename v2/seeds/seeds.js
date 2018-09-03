var mongoose  = require("mongoose"),
    Client    = require("../models/client.js"),
    Medical   = require("../models/medical.js"),
    fs        = require("fs"),
    healthData = [];
    
// Promise.all([
//     buildMedical("./Health_insurance.csv"), 
//     buildChildren("./Children_insurance.csv"), 
//     // buildVision(), 
//     // buildDental()

//     ]).then( function (){//pass to object to mongo)
// });


//constructor
function Healthgroup(name, rates){
    this.type = name;
    this.rates = {};
}



// console.log("outside: ", parseFromFile("./Children_insurance.csv"));

// console.log(parseFromFile("./Health_insurance.csv"));

// function buildMedical(filename){
//     var medical = parseFromFile(filename);
//     // console.log(parseFromFile(filename));
//     // console.log(medical);
//     healthData.medical = medical;
// }


// function buildChildren(filename) { 
//     var children = parseFromFile(filename);
//     healthData.children = children;
// }


// function parseFromFile(filename){
//     fs.readFile(filename, 'utf8', function(err, data){
//         if (err) {
//             console.log(err);
//         } else {
//             function asdfg (){
//                 var rows = data.split(/\r?\n/);
//                 var keys = rows.shift().split(",");
//                 return rows.map(function(row) {
//                     return row.split(",").reduce(function(map, val, i) {
//                         map[keys[i]] = val;
//                         return map;
//                     }, {});
//                 })
//             }        
//         }
//     });
// }



// function parseFromFile(filename){
//     fs.readFile(filename, 'utf8', function(err, data){
//         if (err) {
//             console.log(err);
//         } else {
//             var rows = data.split(/\r?\n/);
//             var keys = rows.shift().split(",");
//             return rows.map(function(row) {
//                 return row.split(",").reduce(function(map, val, i) {
//                     map[keys[i]] = val;
//                     return map;
//                 }, {});
//             });
//         }
//     });
// }




function seedDB(){
    Client.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Clients removed");
        clientData.forEach(function(seed){
            Client.create(seed, function(err, client){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a client: " + client.name);
                }
            });
        });
    });
    
    // Medical.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Medical rates removed");
    //     Medical.create(medicalData, function(err, medical){
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log("Added a medical rate group: " + medical);
    //         }
    //     });
    // });
}

var clientData = [
    {
        name: "Facebook",
        discount: 0.05,
        active: true
    },
    {
        name: "TestCo 2",
        discount: 0.10,
        active: false
    },
    {
        name: "Tesla",
        discount: 0,
        active: true
    },
    {
        name: "Google",
        discount: 0.10,
        active: true
    },
    {
        name: "Amazon",
        discount: 0,
        active: true
    }
];
    
module.exports = seedDB;