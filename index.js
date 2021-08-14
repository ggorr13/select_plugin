import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SelectListsRoutes from "./Routes/SelectLists.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config()

app.use(express.static('public'));
app.use(express.json());
app.use('/api/',SelectListsRoutes);

async function start  () {
    try {
        await mongoose.connect(process.env.MONGNO_DB,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server has been started in port ${PORT}...`))
    } catch (e) {
        console.log(e.message);
    }
}
start()
