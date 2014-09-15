function $(el) {
  var r = document.querySelectorAll(el);
  if(r.length == 1) return r[0];
  else return r;
}
Object.prototype.clicked = function(callback) {
  if(this.length) {
    for(var key of this) {
      key.addEventListener('click', callback);
    }
  }
  else
    this.addEventListener('click', callback);
}

$('#items li').clicked(function(e) {
  if(e.target.className == '') e.target.className = 'yes'
  else e.target.className = '';
});

$('.menu li:nth-child(1)').clicked(function(e) {
  if($('#options').className == 'diactive') {
    $('#generate').className = 'active out';
    setTimeout(function() {
      $('#generate').className = 'diactive';
      $('#options').className = 'active in';
    }, 500)
  }
});
$('.menu li:nth-child(2)').clicked(function(e) {
  if($('#generate').className == 'diactive') {
    $('#options').className = 'active out';
    setTimeout(function() {
      $('#options').className = 'diactive';
      $('#generate').className = 'active in';
    }, 500)
  }
});


//GENERATE AND SHOW RESULT
var req = new XMLHttpRequest();

$('#makeDinner').clicked(function() {
  var url = '/';
  for(var i = 0, len = $('#items li').length; i < len; i++) {
    if($('#items li')[i].className == 'yes')
      url += $('#items li')[i].attributes.val.value;
  }
  req.open('GET', url + '/' + $('#amount').value);
  req.send();
})
req.addEventListener('load', function(e) {
  $('#result').innerHTML = req.responseText;
})
