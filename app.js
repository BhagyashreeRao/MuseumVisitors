const express = require('express');
const app = express();

const port = 3000; 

const visitorRouter = require('./routes/visitor')

app.use('/api/visitor',visitorRouter)

app.listen(port, ()=>{
    console.log('listening on port ' + port)
})