const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = process.env.PORT || 8000,
      cors = require('cors'),
      authRoutes = require('./routes/auth'),
      helmet = require('helmet');

app.use(cors());
//
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.listen(PORT, function(){
    console.log(`Server is starting on ${PORT}`);
})