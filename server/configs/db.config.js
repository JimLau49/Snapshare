const mongoose = require('mongoose');

const connectToDb = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect('mongodb://localhost:27017/app-name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to database');
  });
};

module.exports = connectToDb;
