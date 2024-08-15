const express =require('express')
const dotenv=require('dotenv')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongodb')

const app=express()
dotenv.config()

const userRouter=require('./routers/userRouter')
const adminRouter =require('./routers/adminRouter')

const PORT=process.env.PORT 

// app.use('/public', express.static('src/public'));
app.use(express.json())
app.use(cookieParser())



// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://user-management-react-redux-tailwind.vercel.app/'
  ];
  
  app.use(cors({
    origin: allowedOrigins,
    credentials: true, // This allows cookies to be sent with the request
  }));


// app.use('/profileimages',express.static('public'))
app.use('/public', express.static('src/public'));

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