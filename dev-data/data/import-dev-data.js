const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyhxp.mongodb.net/natours?retryWrites=true&w=majority`;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch(() => {
    console.log('DB connection failed!');
  });

// READ FILE -------------------------------------------
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// IMPORT DATA ------------------------------------------
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA ------------------------------------------
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
