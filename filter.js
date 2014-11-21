var exo = require('./data/exoplanet.json');
var inno = require('./data/innoplanet.json');
exo = exo.concat(inno);

var exo2 = [];

for (var i=0; i<exo.length; i++) {
    var ex = exo[i];
    var name = ex["# name"];
    var orbital_period = parseFloat(ex[" orbital_period"]);
    var orbital_period_err_max = parseFloat(ex[" orbital_period_err_max"]);
    if (isNaN(orbital_period)) continue;
    if (isNaN(orbital_period_err_max)) continue;
    if (orbital_period_err_max<0.0001) continue;
    if (orbital_period<0.0001) continue;
    if (orbital_period<60) continue;
    exo2.push({
	n: name,
	p: orbital_period,
	perr: orbital_period_err_max
    });
}

var fs = require('fs');
fs.writeFileSync("cache/periods.json",JSON.stringify(exo2));
