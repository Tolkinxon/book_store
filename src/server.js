import express from 'express';
import serverConfig from './config.js'
import { mainRouter } from './routes/main.routes.js';
import mongoose from 'mongoose';
const { PORT, dbName } = serverConfig;


const app = express();
app.use(express.json());
app.use('/api', mainRouter);

async function bootstrap() {
    try {
        await mongoose.connect(process.env.dbUrl, {
            dbName,
            serverSelectionTimeoutMS: 5000  
        });
        app.listen(PORT, ()=>console.log(`Server running on PORT-${PORT} port`));
    } catch (error) {
        console.log('MongoDB connection error', error);
    }
}
bootstrap();
