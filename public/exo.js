
Exo = function(stats) {
    this.stats = stats;
}

Exo.prototype.filter = function(ex) {
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
	var name = ex["n"];
	var stats = "";
	var orbital_period = ex["p"];
	var orbital_period_err_max = ex["perr"];
	if (orbital_period_err_max/orbital_period > 0.001) continue;
	stats = " orbital period " + orbital_period + " days +- " + orbital_period_err_max + " days ";
	var reps = days/orbital_period;
	var age = Math.ceil(reps);
	var base = age*orbital_period;
	var diff = base-days;
	if (diff>orbital_period/2) diff -= orbital_period;
	stats += ", reps " + reps + " diff " + diff;
	if (diff>15) continue;
	var idiff = Math.round(diff); 
	if (idiff<-1) continue;
	var ian = name.replace(/ /g,'-') + "-ian";
	var th = "th";
	switch (age % 10) {
        case 1: 
	    th = "st";
	    break;
        case 2: 
	    th = "nd";
	    break;
        case 3: 
	    th = "rd";
	    break;
	}
	th = age + "<sup>" + th + "</sup>";
	if (age == 0) th = "Zeroth";
	if (age == 1) th = "First";
	if (age == 2) th = "Second";
	log.push({
	    name: name,
	    stats: stats,
	    diff: diff,
	    idiff: idiff,
	    ian: ian,
	    th: th,
	    age: age,
	    orbital_period: orbital_period,
	    value: -diff
	});
    }
    function sortHit(a,b) {
	var va = Math.abs(a.value);
	var vb = Math.abs(b.value);
	if (va>vb) return 1;
	if (va<vb) return -1;
	return 0;
    }
    log.sort(sortHit);
    var bests = [];
    for (var i=0; i<log.length; i++) {
	var ex = log[i];
	if (ex.idiff == 0) {
	    bests.push(ex);
	    continue;
	}
	if (ex.idiff>5) break;
    }
    if (bests.length==0) {
	for (var i=0; i<log.length; i++) {
	    var ex = log[i];
	    if (ex.idiff<0) continue;
	    if (ex.idiff<=3) {
		bests.push(ex);
		continue;
	    }
	    break;
	}
    }
    if (bests.length==0) {
	for (var i=0; i<log.length; i++) {
	    var ex = log[i];
	    if (ex.idiff<=3) {
		bests.push(ex);
		continue;
	    }
	    break;
	}
    }
    return { log: log, best: bests };
}

if (typeof module !== 'undefined') {
    module.exports.Exo = Exo;
}
