var express = require('express')
var app = express();

var exo = require('./cache/periods.json');
var people = require('./data/people.json');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var router = express.Router();

router.get('/', function(request, response) {
  response.render('index.ejs', {
      layout: false,
      exo: exo,
      people: people,
      date: null
  });
});

router.get('/:year/:month/:day', function(request, response) {
  response.render('index.ejs', {
      layout: false,
      exo: exo,
      people: people,
      date: request.params
  });
});


app.use('/', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
