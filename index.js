var express = require('express')
var app = express();

var exo = require('./cache/periods.json');
var people = require('./data/people.json');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var router = express.Router();

function mainRender(response,date) {
  response.render('index.ejs', {
      layout: false,
      exo: exo,
      people: people,
      date: date
  });
}

router.get('/', function(request, response) {
    mainRender(response,null);
});

router.get('/:year/:month/:day', function(request, response) {
    mainRender(response,request.params);
});

router.get('/:year/:month/:day/:nyear/:nmonth/:nday', function(request, response) {
    mainRender(response,request.params);
});


app.use('/', router);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
