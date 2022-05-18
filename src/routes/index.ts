//import express from 'express';
import express, { Request, Response } from 'express';
import morgan from 'morgan';

const routes = express.Router();
routes.use(morgan('dev'));

routes.get('/', (req: Request, res: Response): void => {
  res.sendStatus(200);
});

export default routes;
