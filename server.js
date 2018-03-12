const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('express').Router();
const port = process.env.PORT || 5000;
const http = require('http');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Promise = require('bluebird');
const fsa = Promise.promisifyAll(require('fs'));


app.use(express.static('build'));
app.use(cors());
app.use(bodyParser.json({ type: 'text/plain'}));

app.post('/api/sessions', (req, res) => {
  db.collection('users').findOne({"credential.email": req.body.email}).then(function(results) {
    if(results && results.data) {

			Promise.all(
        results.data.shows.map(x => fsa.readFileAsync(__dirname + '/shows/' + x + '.json', "utf8"))
      ).then((showData) => {
        res.send(JSON.stringify({credential: results.credential, data: results.data, _id: results._id, showData: showData}))
      });

    } else if (results) {
      res.send(JSON.stringify({credential: results.credential, _id: results._id}));

    } else {
      db.collection('users').insertOne({credential: req.body}, (err, result) => {
        if (err) return console.log(err);
        res.send(result.ops[0]);
        console.log(req.body.name + ' updated');
      });
    }

  });

});

app.post('/api/update', (req, res) => {
  db.collection('users').findOneAndUpdate(
    {_id: ObjectId(req.body.id)},
    { $set: {data: req.body.data}},
  ).catch((e) => console.log(e));
});

app.get('/api/show/:id', (req, res) => {
  res.sendFile(__dirname + '/shows/' + req.params.id + '.json');
});
MongoClient.connect('mongodb://munderwoods:' + process.env.MLAB_PASS + '@ds263948.mlab.com:63948/mytoonami', (err, client) => {
  if (err) return console.log(err);
  db = client.db('mytoonami');
  console.log("Connected to database: " + db.s.databaseName);
});

app.listen(port, () => console.log(`Listening on port ${port}`));


