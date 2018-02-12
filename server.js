const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const http = require('http');

app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json({ type: 'text/plain'}));

app.post('/api/sessions', (req, res) => {
  console.log(JSON.stringify(req.body.email));
  res.send(req.body.email);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
//http.createServer(app).listen(port,
//  function(){
//    console.log("Express server listening on port " + app.get('port'));
//});


