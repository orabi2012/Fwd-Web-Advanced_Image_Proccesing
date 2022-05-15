import express from 'express';
import * as dotenv from 'dotenv';

import routes from './routes/index';
import img from './routes/api/img';
//import check from './utilities/reqCheck';

//port setting
dotenv.config();
const PORT = process.env.PORT;

// create an instance server
const app: express.Application = express();
// HTTP request logger middleware

app.use('/api', routes);
app.use('/api/img', img);
//app.use('check', check);

app.listen(PORT, () => {
  console.log(`i am Express server , Running @ port ${PORT}`);
});
