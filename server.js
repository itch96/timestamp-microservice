// server.js
// where your node app starts

// init project
const express = require('express');
const timestamp = require('unix-timestamp');

//var {isValid, isNatural, isUnix} = require('./playground/checkId.js');

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', (request, response) => {
  var date = request.params.date;
  var output = {"unix": null, "natural": null};  
  if(hasSpace(date)) {
    if(timestamp.fromDate(date)) {
      output = {"unix": timestamp.fromDate(date), "natural": date};    
    }
  } else {
    date = parseInt(date);
    var natural = timestamp.toDate(date);
    if(myMonth(natural.getMonth()) != 'Month') {
      output = {"unix": date, "natural": natural.getDate() + ' ' + myMonth(natural.getMonth()) + ', '  + natural.getFullYear()};
    }
    
  }
  response.send(output);
});

var hasSpace = (string) => /\s/g.test(string);
var myMonth = (month) => {
  switch (month + 1) {
    case 1:
      return 'January';
      break;
    case 2:
      return 'February';
      break;
    case 3:
      return 'March';
      break;
    case 4:
      return 'April';
      break;
    case 5:
      return 'May';
      break;
    case 6:
      return 'June';
      break;
    case 7:
      return 'July';
      break;
    case 8:
      return 'August';
      break;
    case 9:
      return 'September';
      break;
    case 10:
      return 'October';
      break;
    case 11:
      return 'November';
      break;
    case 12:
      return 'December';
      break;
    default:
      return 'Month';
      break;
  }
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
