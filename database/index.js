const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/avsettings')
  .then(()=> {
    console.log('successfully connected to DB')
  })
  .catch((err)=> {
    console.log('unable to connect to db', 'err: ', err)
  })

const SettingSchema = mongoose.Schema({
  name: String,
  style: String,
  fft: String,
  color: String,
  background: String,
  fill: String,
  red: Number,
  green: Number,
  blue: Number
});

const SettingsModel = mongoose.model('setting', SettingSchema);

module.exports.SettingsModel = SettingsModel;
