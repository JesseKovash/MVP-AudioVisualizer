const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/avsettings')
  .then(()=> {
    console.log('successfully connected to DB')
  })
  .catch((err)=> {
    console.log('unable to connect to db', 'err: ', err)
  })

const SettingSchema = mongoose.Schema({
  name: 'string',
  style: 'string',
  fft: 'string',
  color: 'string',
  background: 'string',
  shape: 'string',
  fill: 'string',
  red: 'string',
  green: 'string',
  blue: 'string'
});

const SettingsModel = mongoose.model('setting', SettingSchema);

//create connection next


module.exports.SettingsModel = SettingsModel;

// {
//   "name": 'bubbles',
//   "style": 'square',
//   "fft": '64',
//   "color": 'black',
//   "background": 'white',
//   "shape": null,
//   "fill": null
// }