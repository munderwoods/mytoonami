const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('express').Router();
const port = process.env.PORT || 5000;
const http = require('http');
const fs = require('fs');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json({ type: 'text/plain'}));

app.post('/api/sessions', (req, res) => {
  console.log(JSON.stringify(req.body.name));
  res.send(req.body);
});

app.get('/api/show/:id', (req, res) => {
  res.sendFile(__dirname + '/shows/' + req.params.id + '.json');
  /*fs.readFile('./shows/' + req.params.id + '/' + req.params.id + '.json', 'utf8', function(err, contents) {
    res.send(contents);
    */
});

app.listen(port, () => console.log(`Listening on port ${port}`));
//http.createServer(app).listen(port,
//  function(){
//    console.log("Express server listening on port " + app.get('port'));
//});


