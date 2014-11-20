
Exo = function(stats) {
    this.stats = stats;
}

Exo.prototype.compute = function(now,birth) {
    var nowday = new Date(now.getTime());
    nowday.setHours(0);
    nowday.setMinutes(0);
    nowday.setMilliseconds(0);
    var secs = (nowday.getTime() - birth.getTime())/1000.0;
    var days = secs/(60*60*24);
    var log = [];
    for (var i=0; i<this.stats.length; i++) {
	var ex = this.stats[i];
	var name = ex["# name"];
	var stats = "";
	var orbital_period = parseFloat(ex[" orbital_period"]);
	var orbital_period_err_max = parseFloat(ex[" orbital_period_err_max"]);
	if (isNaN(orbital_period)) continue;
	if (isNaN(orbital_period_err_max)) continue;
	if (orbital_period_err_max<0.0001) continue;
	if (orbital_period<0.0001) continue;
	if (orbital_period<60) continue;
	if (orbital_period_err_max/orbital_period > 0.001) continue;
	stats = " orbital period " + orbital_period + " days +- " + orbital_period_err_max + " days ";
	var reps = days/orbital_period;
	var age = Math.ceil(reps);
	var base = age*orbital_period;
	var diff = base-days;
	if (diff>orbital_period/2) diff -= orbital_period;
	stats += ", reps " + reps + " diff " + diff;
	console.log(stats);
	if (diff>15) continue;
	var idiff = Math.round(diff); 
	if (idiff<-1) continue;
	log.push({
	    name: name,
	    stats: stats,
	    diff: diff,
	    idiff: idiff,
	    age: age,
	    orbital_period: orbital_period,
	    value: -diff
	});
    }
    function sortHit(a,b) {
	var va = a.value;
	var vb = b.value;
	if (va>vb) return -1;
	if (va<vb) return 1;
	return 0;
    }
    log.sort(sortHit);
    return log;
}