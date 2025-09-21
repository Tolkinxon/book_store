import c from 'dotenv'; 
c.config();

const serverConfig = {
    PORT: process.env.PORT || 3000,
    dbName: process.env.DB_NAME,
    file: {
        avatar: {
            formats: ['image/png', 'image/jpg', 'image/jpeg'],
            size: 3
        }
    }
}

export default serverConfig;