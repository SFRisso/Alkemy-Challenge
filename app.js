const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api')
const app = express();
const port = 3000;
require('./db.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Servidor iniciado.');
})

app.use('/api', apiRouter);

app.listen(port, () => {

})