const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const { SettingsModel } = require('../database/index.js');
const app = express();
// const port = 2000;
const port = process.env.PORT || 3001;
const path = require("path");
app.use(express.static(path.resolve(__dirname, '../build')))
app.use(express.json());
app.use(cors());

//Firebase
app.post('/new_settings', async function (req, res) {
  const response = await axios.post('https://show-me-the-tunes-default-rtdb.firebaseio.com/settings.json',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    }
  )

  if (response.status === 200) {
    res.status(200);
  } else {
    res.status(400);
  }
})

app.get('/settings', async function (req, res) {
  const response = await axios.get('https://show-me-the-tunes-default-rtdb.firebaseio.com/settings.json');
  let past = [];
  for (let one in response.data) {
    const setting = response.data[one].body;
    if (past.length < 8) {
      past.push(JSON.parse(setting))} else {
        break;
      }
  }
  if (response.status === 200) {
    res.status(200).send(past);
  } else {
    res.status(400);
  }
})

//MongoDB

// app.post('/new_settings', (req, res) => {
//   SettingsModel.findOneAndUpdate({name: req.body.name}, req.body, {upsert: true})
//     .then((results)=> {
//       res.status(201).send(results);
//     })
//     .catch((err)=> {
//       res.status(400).send(err);
//     })
// })

// app.get('/settings', (req, res) => {
//   SettingsModel.find({})
//     .then((results) => {
//       res.status(200).send(results);
//     })
//     .catch((err)=>{
//       res.status(400).send(err);
//     })
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})