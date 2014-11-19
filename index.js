var express = require('express')
var app = express();

var exo = require('./data/exoplanet.json');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.render('index.ejs', {
      layout: false,
      exo: exo
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
