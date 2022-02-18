const express = require('express');
const bodyParse = require('body-parser');
const app_route = require('./routes/app_api');
const mongoose = require('mongoose');
const config = require('./config/db.mongo');

const app = express()

app.use(bodyParse.json())

app.use(bodyParse.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our application' })
})

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

app_route(app);
//route(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
