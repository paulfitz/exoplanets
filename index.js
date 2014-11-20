var express = require('express')
var app = express();

var exo = require('./data/exoplanet.json');
var inno = require('./data/innoplanet.json');
exo = exo.concat(inno);

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var router = express.Router();

router.get('/', function(request, response) {
  response.render('index.ejs', {
      layout: false,
      exo: exo,
      date: null
  });
})

router.get('/:year/:month/:day', function(request, response) {
  response.render('index.ejs', {
      layout: false,
      exo: exo,
      date: request.params
  });
});


app.use('/', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
