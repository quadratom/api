const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/route', require('./route/api/route'))


app.listen(4500, () => {
    console.log('localhost is port 4500');
})