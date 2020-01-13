require('dotenv').config()
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = process.env.PORT || 8000,
      cors = require('cors'),
      authRoutes = require('./routes/auth'),
      mongoose = require('mongoose'),
      helmet = require('helmet');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('DB CONNECTED'))
    .catch(err => console.log(`Error: ${err}`))

app.use(cors());
//
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV = 'development') {
    app.use(cors({origin: `http://localhost:3000`}))
}

app.use('/api', authRoutes);

app.listen(PORT, function(){
    console.log(`Server is starting on ${PORT}`);
})