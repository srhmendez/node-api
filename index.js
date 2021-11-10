const express = require ('express');
const bodyParser = require ('body-parser');
const todosRoutes = require ('./Routes/router');
require('dotenv').config({ path: '/config.env' })



const app = express();
const connectDB = require('./connection/connection')
const PORT = process.env.PORT || 8080;





app.use(bodyParser.json());

app.use(express.json());

app.get('./static/')

app.use('/todos/', todosRoutes);

app.use(express.static('static'));

connectDB();

app.get('/', (req, res, next) => {
    res.send('Hello World :)')
})

app.listen(PORT, () => console.log(`YAY server running on ${PORT}`));         

module.exports = app;