const express = require('express');
const { find, findOneAndUpdate } = require('mongoose');
const axios = require('axios');
const { SettingsModel } = require('../database/index.js');
const app = express();
const port = 2000;
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());

app.post('/new_settings', (req, res) => {
  console.log('inpost');
  console.log('setting: ', SettingsModel)
  SettingsModel.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true})
    .then((results)=> {
      res.status(201).send(results);
    })
    .catch((err)=> {
      res.status(400).send(err);
    })
})

app.get('/settings', (req, res) => {
  console.log('inget')
  SettingsModel.find({})
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err)=>{
      res.status(400).send(err);
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})