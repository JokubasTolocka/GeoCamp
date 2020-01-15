require('dotenv').config()
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      PORT = process.env.PORT || 8000,
      cors = require('cors'),
      Campground = require('./models/campground');
      authRoutes = require('./routes/auth'),
      campgroundRoutes = require('./routes/campground'),
      mongoose = require('mongoose'),
      {loginRequired} = require('./middleware/auth');
      helmet = require('helmet');

mongoose.set('debug', true);
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
app.use('/api', campgroundRoutes);

app.get('/api/campgrounds', loginRequired, async function(req,res,next){
    try{
        let campgrounds = await Campground.find()
            .sort({createdAt: 'desc'})
            .populate('user', {
                name: true
            });
            return res.status(200).json(campgrounds);
    }catch(err){
        return next(err);
    }
});

app.listen(PORT, function(){
    console.log(`Server is starting on ${PORT}`);
})