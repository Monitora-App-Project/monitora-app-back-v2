require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const port = process.env.PORT || 3333;

const app = express();
app.use(express.static('public'));
const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);
app.use(errors());

app.use('/', (req, res) => {
  return res.status(200).json({
    notification: 'Ok, server MonitoraApp is running!',
  });
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
