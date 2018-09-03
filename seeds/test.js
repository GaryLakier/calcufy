var fs            = require("fs"),
    healthcare    = [],
    ratesOBJ      = {},
    tempOBJ       = {};
    

//constructor
function Healthgroup(name, rates){
    this.type = name;
    this.rates = rates;
    this.console = function(){
        console.log(this);
    };
}

//first
function parseFromFile(filename, name){
    fs.readFile(filename, 'utf8', function(err, data){
        if (err) {
            console.log(err);
        } else {
            ctrObj(data, name);
        }
    });
}

//second
function ctrObj(data, name){
    var rows = data.split(/\r?\n/);
    var keys = rows.shift().split(",");
    // var ratesARR = rows.map(function(row) {
    var ratesARR = createRateObj(rows)
        // console.log(row);
        // console.log(row.split(",").reduce(key, pair){
            
        // }
        //////NEED TO GET NAME OR PROPERTY USED IN '0' and use in '1' to assign value
        // var splRow = row.split(",");

        // for (var i = 0; i < splRow.length; i++) {
        //         if (i===0) {
        //             tempOBJ[splRow[i]] = splRow[1];
        //         }
        // }
        
        // return tempOBJ;
        
        // return row.split(",").reduce(function(map, val, i) {
        //     console.log(map);
        //     console.log("val is: " + val);
        //     console.log("i is: " + i);
        //         if (i===0) {
        //             map[val] = "";
        //             var myKey = map[val];
        //             console.log("0 if - myKey below: ");
        //             console.log(myKey);
        //         } else {
        //             map[1] = val;
        //             console.log("1 if - myKey below: ");
        //             console.log(myKey);
        //         }
        //     console.log("Map below");
        //     console.log(map);
        //     console.log("========END OF SET========");
        //     return map;
            
        // }, {});
    
    // console.log(ratesARR);
    // for (var i = 0; i < ratesARR.length; i++) {
    //     ratesOBJ[i] = ratesARR[i];
    // }
    
    // console.log(ratesARR);
    
    // var name = new Healthgroup(name, ratesOBJ);
    
    // healthcare.push(ratesOBJ);
    
    // console.log(healthcare);
    // name.console();
}


parseFromFile("./Health_insurance.csv", "medical");
// parseFromFile("./Children_insurance.csv", "children");

console.log("This is running...")

function createRateObj(rows){
    // console.log(rows);
    for (var i = 0; i < rows.length; i++) {
        console.log(rows.length);
        var splRow = rows[i].split(",");
        for (var i = 0; i < splRow.length; i++) {
            console.log(splRow.length)
            if (i===0) {
                tempOBJ[splRow[i]] = splRow[1];
            }
        }
        // console.log(tempOBJ);
    }
    // console.log(tempOBJ);
    return tempOBJ;
}