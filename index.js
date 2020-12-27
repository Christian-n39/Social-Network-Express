require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(cors())
app.use(express.json())
app.use(require('./cors'));
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/users'));

const port = process.env.PORT || 5000;
const { DB_USER, DB_PASSWORD, DB_AT, DB_NAME } = process.env;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_AT}/${DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => { console.log(`Server at http://localhost:${port}`) })
  })