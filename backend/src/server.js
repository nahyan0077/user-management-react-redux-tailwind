const express =require('express')
const dotenv=require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongodb')

const app=express()
dotenv.config()

const userRouter=require('./routers/userRouter')
const adminRouter =require('./routers/adminRouter')

const PORT=process.env.PORT || 4000

app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())



// CORS configuration
const allowedOrigins = [
    'http://localhost:3002',
    'https://user-management-react-redux-tailwind.onrender.com'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use('/profileimages',express.static('public'))
app.use('/',userRouter)
app.use('/admin',adminRouter)


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });



app.listen(PORT,(error)=>{
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        console.log(`Server running at http://localhost:${PORT}`);
    }
})