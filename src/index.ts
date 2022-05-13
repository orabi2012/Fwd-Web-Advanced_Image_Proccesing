import express from 'express';
import * as dotenv from 'dotenv';

import routes from './routes/index';
import img from './routes/api/img';

//port setting
dotenv.config();
const PORT = process.env.PORT || 3000;

// create an instance server
const app: express.Application = express();
// HTTP request logger middleware

app.use('/api', routes);
app.use('/api/img', img);

app.listen(PORT, () => {
    console.log(`i am Express server , Running @ port ${PORT}`);
});
