const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyhxp.mongodb.net/natours?retryWrites=true&w=majority`;

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch(() => {
    console.log('DB connection failed!');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
