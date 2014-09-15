var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/client'));


app.get('/*/*', function(req, res) {
  var data = req.url.split('/').slice(1);
  res.send(generate(data));
});

function randomize(max, min) {
  return Math.floor(Math.random() * max - min + 1) - min;
}
String.prototype.random = function() {
  var used = [],
      r = '';
  for(var i = 0, len = this.length; i < len; i++) {
    var random = randomize(this.length - 1, 0);
    while(used.indexOf(random) > 0)
      random = randomize(this.length-1, 0);
    r += this[random];
    used.push(random);
  }
  return r;
}

//PASSWORD GENERATOR
function generate(dinner) {
  var data = [0123456789,
  '!@#$%^&*',
  'qwertyuiopasdfghjklzxcvbnm',
  'QWERTYUIOPASDFGHJKLZXCVBNM',
  '()_+/*-+.{};<>?~[]:;`'];

  var r = '';
  for(var i = 0, len = dinner[0].length; i < len; i++) {
    r += data[dinner[0][i]];
  }
  if(dinner[1] == '') dinner[1] = 5;
  while(r.length < dinner[1])
    r += r;

  return r.random().slice(0, dinner[1]);
}
