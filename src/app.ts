import express, { Request, Response, Application } from 'express';
import * as dotenv from 'dotenv';

import routes from './routes/index';
import img from './routes/api/images';

//port setting
dotenv.config();

const PORT: number = parseInt(<string>process.env.PORT);

// create an instance server
const app: Application = express();
// HTTP request logger middleware

app.use('/api', routes);
app.use('/api/images', img);

app.get('/', function (req: Request, res: Response): void {
  res.status(200).send(`i am Express server , Running @ port ${PORT}`);
});

app.listen(PORT, (): void => {
  console.log(`i am Express server , Running @ port ${PORT}`);
});

export default app;
