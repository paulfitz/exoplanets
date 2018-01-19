var argv = require('minimist')(process.argv.slice(2));

if (argv.h || argv.help || argv._.length != 3) {
    console.log("Call with YYYY MM DD of your birthday.");
    exit(1);
}

var Exo = require("./public/exo").Exo;
var data = require('./cache/periods.json');

var exo = new Exo(data);

var now = new Date(new Date().toDateString());

var year = 1974;
var month = 10;
var day = 18;

var birth = new Date(argv._[0],argv._[1]-1,argv._[2]);

var calc = exo.compute(now,birth);

var helpers = {};

helpers.cap = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

helpers.sayTense = function(unit, person) {
    if (unit.idiff == 0) {
	return (person == 3) ? "is" : "are";
    } else if (unit.idiff > 0) {
	return "will be";
    } 
    return (person == 3) ? "was" : "were";
}

helpers.sayWhen = function(unit) {
    if (unit.idiff == 0) {
	return "today";
    } else if (unit.idiff == 1) {
	return "tomorrow";
    } else if (unit.idiff == -1) {
	return "yesterday";
    }
    return "in " + unit.idiff + " days time";
}

for (var i=0; i<Math.min(15, calc.log.length); i++) {
    var unit = calc.log[i];
    var msg = "on " + unit.name + " you " + helpers.sayTense(unit,"you") + " " + unit.age
        + " " + helpers.sayWhen(unit);
    console.log(msg);
}

