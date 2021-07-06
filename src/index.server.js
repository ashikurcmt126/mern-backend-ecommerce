const express = require('express')
const env = require('dotenv')
//const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const path = require('path')

//routes
const authRoutes = require('./routers/auth')
const adminRoutes = require('./routers/admin/auth')
const categoryRoutes = require('./routers/category')
const productRoutes = require('./routers/product')
const cartRoutes = require('./routers/cart')
const initialDataRoutes = require('./routers/admin/initialData')
const pageRoutes = require('./routers/admin/page')


//Environment variable or you can say constants
env.config()

const url = 'mongodb://localhost/ecommercef'
mongoose.connect(url, {urlNewUrlParser:true})
const con = mongoose.connection

con.on('open', ()=>{
    console.log("Connected...");
})


//MongoDB connection
// mongoose.connect(
//     `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.xjtdx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
//     {
//      useNewUrlParser: true,
//      useUnifiedTopology: true
//     }
//  ).then(()=>{
//      console.log("Database connected....");
//  });
 //var urlencodedParser = bodyParser.urlencoded({ extended: true });
 app.use(express.json())
 app.use('/public',express.static(path.join(__dirname, '../uploads')))

app.use(cors())
app.use('/api/', authRoutes);
app.use('/api/', adminRoutes);
app.use('/api/',categoryRoutes);
app.use('/api/',productRoutes);
app.use('/api/',cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes); 


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
} )
