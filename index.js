const express = require ('express');
const bodyParser = require ('body-parser');
const todosRoutes = require ('./Routes/todos.js');


const app = express();
const PORT = 5000;



app.use(bodyParser.json());

app.use(express.json());

app.get('./static/')

app.use('/todos/', todosRoutes);

app.use(express.static('static'));

app.get('/', (req, res, next) => {
    res.send('Hello World :)')
})

app.listen(PORT, () => console.log(`YAY server running on port: http://localhost:${PORT}`));         

module.exports = app;