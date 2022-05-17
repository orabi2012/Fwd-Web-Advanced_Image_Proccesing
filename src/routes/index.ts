import express from 'express';
import morgan from 'morgan';

const routes = express.Router();
routes.use(morgan('dev'));

routes.get('/', (req, res) => {
  res.sendStatus(200);
});

export default routes;
