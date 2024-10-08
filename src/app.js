import express from 'express';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import mongoose from 'mongoose';

import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from './routes/views.router.js';



const app = express();

const PORT = process.env.PORT||8080;

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));

app.engine('handlebars',handlebars.engine({runtimeOptions:{allowProtoPropertiesByDefault:true}}));
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');


app.use(express.static(`${__dirname}/public`))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://danielcaballero3960:4LIeay23kOXQ361V@cluster0.i9wld.mongodb.net/ecomerce?retryWrites=true&w=majority&appName=Cluster0");

app.use('/',viewsRouter);
app.use('/api/products',productsRouter);
app.use("/api/carts",cartsRouter);



