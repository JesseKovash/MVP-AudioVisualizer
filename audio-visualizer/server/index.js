const express = require('express');
const { find, findOneAndUpdate } = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const { SettingsModel } = require('../database/index.js');
const app = express();
const port = 2000;
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(cors());

app.post('/new_settings', (req, res) => {
  SettingsModel.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true})
    .then((results)=> {
      res.status(201).send(results);
    })
    .catch((err)=> {
      res.status(400).send(err);
    })
})

app.get('/settings', (req, res) => {
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