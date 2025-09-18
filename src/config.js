import c from 'dotenv'; 
c.config();

const serverConfig = {
    PORT: process.env.PORT || 3000,
    dbName: process.env.DB_NAME
}

export default serverConfig;