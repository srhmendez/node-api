const express = require ('express');
const bodyParser = require ('body-parser');
const todosRoutes = require ('./Routes/router.js');



const app = express();
const connectDB = require('./connection')





app.use(bodyParser.json());

app.use(express.json());

app.get('./static/')

app.use('/todos/', todosRoutes);

app.use(express.static('static'));

connectDB();

app.get('/', (req, res, next) => {
    res.send('Hello World :)')
})

app.listen(console.log(`YAY server running`));         

module.exports = app;